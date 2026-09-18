export const codeBlock = {
  name: 'codeBlock',
  title: 'Code',
  type: 'object',
  fields: [
    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'Java', value: 'java' },
          { title: 'C++', value: 'cpp' },
          { title: 'C', value: 'c' },
          { title: 'Bash', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'SQL', value: 'sql' },
          { title: 'Go', value: 'go' },
        ],
      },
      initialValue: 'javascript',
    },
    {
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional, e.g. server.js',
    },
    {
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 12,
      validation: (Rule: { required: () => unknown }) => Rule.required(),
    },
    {
      name: 'defaultOpen',
      title: 'Open by default',
      type: 'boolean',
      initialValue: false,
    },
  ],
  preview: {
    select: { filename: 'filename', language: 'language' },
    prepare({ filename, language }: { filename?: string; language?: string }) {
      return {
        title: filename || 'Code Block',
        subtitle: language,
      }
    },
  },
}
