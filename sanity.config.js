import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import structure from './sanity/structure';

export default defineConfig({
  name: 'default',
  title: 'RDR2 Checklist',
  projectId: 'z0b41w7s',
  dataset: 'production',
  basePath: '/admin',

  plugins: [deskTool({ structure }), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
