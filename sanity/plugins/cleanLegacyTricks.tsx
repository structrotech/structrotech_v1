import React, { useEffect } from 'react'
import { definePlugin, useClient, type LayoutProps } from 'sanity'

function LegacyTricksCleaner() {
  const client = useClient({ apiVersion: '2024-01-01' })

  useEffect(() => {
    let isMounted = true
    client
      .fetch<Array<{ _id: string }>>(`*[_type == "trick"]{ _id }`)
      .then(async (docs) => {
        if (!isMounted || !docs || docs.length === 0) return
        const tx = client.transaction()
        for (const d of docs) {
          const pubId = d._id.replace(/^drafts\./, '')
          tx.delete(pubId)
          tx.delete(`drafts.${pubId}`)
        }
        await tx.commit()
      })
      .catch((err) => {
        console.error('[AutoClean] Legacy trick cleanup error:', err)
      })

    return () => {
      isMounted = false
    }
  }, [client])

  return null
}

export const cleanLegacyTricksPlugin = definePlugin({
  name: 'clean-legacy-tricks',
  studio: {
    components: {
      layout: (props: LayoutProps) => (
        <React.Fragment>
          <LegacyTricksCleaner />
          {props.renderDefault(props)}
        </React.Fragment>
      ),
    },
  },
})
