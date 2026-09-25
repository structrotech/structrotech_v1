import { defineConfig, type SchemaTypeDefinition } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity/schema/index'
import { SafeDeleteAction } from './sanity/actions/SafeDeleteAction'
import { cleanLegacyTricksPlugin } from './sanity/plugins/cleanLegacyTricks'

export default defineConfig({
  name: 'structrotech',
  title: 'StructroTech',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wvz6gdxf',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  plugins: [structureTool(), cleanLegacyTricksPlugin()],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
  document: {
    actions: (prev) =>
      prev.map((originalAction) =>
        originalAction.action === 'delete' ? SafeDeleteAction : originalAction
      ),
  },
})