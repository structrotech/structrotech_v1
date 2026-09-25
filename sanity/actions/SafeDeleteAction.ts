import { useState } from 'react'
import {
  type DocumentActionProps,
  type DocumentActionDescription,
  useClient,
} from 'sanity'

export function SafeDeleteAction(props: DocumentActionProps): DocumentActionDescription {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const client = useClient({ apiVersion: '2024-01-01' })

  return {
    label: isDeleting ? 'Deleting...' : 'Delete',
    tone: 'critical',
    title: 'Delete this document (automatically unlinks related references)',
    disabled: isDeleting,
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: dialogOpen
      ? {
          type: 'confirm',
          onCancel: () => setDialogOpen(false),
          onConfirm: async () => {
            setIsDeleting(true)
            try {
              const publishedId = props.id.replace(/^drafts\./, '')
              const draftId = `drafts.${publishedId}`

              // 1. Find ANY documents that reference this document anywhere
              const referencingDocs = await client.fetch<Array<Record<string, any>>>(
                `*[references($id)]`,
                { id: publishedId }
              )

              // 2. Unlink this document from all referencing documents
              for (const doc of referencingDocs) {
                // If it is an old dead "trick" document (legacy prototype), delete it directly
                if (doc._type === 'trick') {
                  try {
                    await client.delete(doc._id)
                  } catch (e) {
                    console.error('Error deleting legacy trick:', e)
                  }
                  continue
                }

                let patch = client.patch(doc._id)
                const unsets: string[] = []

                // Unlink single reference fields like linkedPost
                if (doc.linkedPost && (doc.linkedPost._ref === publishedId || doc.linkedPost._ref === draftId)) {
                  unsets.push('linkedPost')
                }

                // Unlink array references like relatedBlogs
                if (Array.isArray(doc.relatedBlogs) && doc.relatedBlogs.some((r: any) => r?._ref === publishedId || r?._ref === draftId)) {
                  unsets.push(`relatedBlogs[_ref=="${publishedId}"]`)
                  unsets.push(`relatedBlogs[_ref=="${draftId}"]`)
                }

                // Unlink array references like relatedTricks
                if (Array.isArray(doc.relatedTricks) && doc.relatedTricks.some((r: any) => r?._ref === publishedId || r?._ref === draftId)) {
                  unsets.push(`relatedTricks[_ref=="${publishedId}"]`)
                  unsets.push(`relatedTricks[_ref=="${draftId}"]`)
                }

                // Scan any other top-level fields for direct references
                for (const [key, value] of Object.entries(doc)) {
                  if (
                    value &&
                    typeof value === 'object' &&
                    (value as any)._type === 'reference' &&
                    ((value as any)._ref === publishedId || (value as any)._ref === draftId)
                  ) {
                    if (!unsets.includes(key)) {
                      unsets.push(key)
                    }
                  }
                }

                if (unsets.length > 0) {
                  try {
                    await patch.unset(unsets).commit()
                  } catch (e) {
                    console.error(`Error unsetting references on ${doc._id}:`, e)
                  }
                }
              }

              // 3. Delete this document (both draft and published versions)
              const tx = client.transaction()
              tx.delete(draftId)
              tx.delete(publishedId)
              await tx.commit()

              props.onComplete()
            } catch (err: any) {
              console.error('Delete error:', err)
              alert('Could not delete: ' + (err?.message || err))
            } finally {
              setIsDeleting(false)
              setDialogOpen(false)
            }
          },
          message:
            'Are you sure you want to delete this document? Any other blogs or tricks that referenced it will be unlinked automatically, and another blog will automatically replace it on your website.',
        }
      : null,
  }
}

SafeDeleteAction.action = 'delete' as const
