import { defineConfig, type SchemaTypeDefinition } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'structrotech',
  title: 'StructroTech',
  projectId: 'wvz6gdxf',
  dataset: 'production',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes as SchemaTypeDefinition[],
  },
})