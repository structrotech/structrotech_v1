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

              // 1. Find all documents that reference this document in relatedBlogs or relatedTricks
              const referencingDocs = await client.fetch<
                Array<{ _id: string; relatedBlogs?: Array<{ _ref: string }>; relatedTricks?: Array<{ _ref: string }> }>
              >(
                `*[references($id)]{ _id, relatedBlogs, relatedTricks }`,
                { id: publishedId }
              )

              // 2. Unlink this document from all referencing documents
              for (const doc of referencingDocs) {
                let patch = client.patch(doc._id)
                let shouldPatch = false

                if (doc.relatedBlogs && doc.relatedBlogs.some((r) => r._ref === publishedId)) {
                  patch = patch.unset([`relatedBlogs[_ref=="${publishedId}"]`])
                  shouldPatch = true
                }
                if (doc.relatedTricks && doc.relatedTricks.some((r) => r._ref === publishedId)) {
                  patch = patch.unset([`relatedTricks[_ref=="${publishedId}"]`])
                  shouldPatch = true
                }

                if (shouldPatch) {
                  await patch.commit()
                }
              }

              // 3. Delete this document (both draft and published)
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
