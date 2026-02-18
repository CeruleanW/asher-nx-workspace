/**
 * Utility to parse markdown content to Slate structure
 */

export const parseMarkdownToSlate = (markdown: string) => {
  // Simple parser: split by double newline to create paragraphs
  // This can be enhanced later with a proper markdown parser library
  const paragraphs = markdown.split(/\n\s*\n/);

  return paragraphs.map((text) => ({
    type: 'paragraph',
    children: [{ text: text.trim() }],
  })).filter(node => node.children[0].text !== '');
};

/**
 * Read file content
 */
export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target?.result as string);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsText(file);
  });
};
