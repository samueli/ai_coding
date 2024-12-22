import React from 'react';
import ReactMarkdown from 'react-markdown';

export const MarkdownContent = ({ content }) => {
  if (!content) return null;
  
  return (
    <ReactMarkdown
      className="prose prose-sm dark:prose-invert max-w-none"
      components={{
        // 自定义链接在新标签页打开
        a: ({ node, ...props }) => (
          <a target="_blank" rel="noopener noreferrer" {...props} className="text-primary hover:underline" />
        ),
        // 调整标题大小
        h1: ({ node, ...props }) => <h1 {...props} className="text-lg font-bold mt-0" />,
        h2: ({ node, ...props }) => <h2 {...props} className="text-base font-bold mt-0" />,
        h3: ({ node, ...props }) => <h3 {...props} className="text-base font-semibold mt-0" />,
        // 调整段落样式
        p: ({ node, ...props }) => <p {...props} className="text-base leading-relaxed my-2" />,
        // 调整列表样式
        ul: ({ node, ...props }) => <ul {...props} className="list-disc list-inside my-2" />,
        ol: ({ node, ...props }) => <ol {...props} className="list-decimal list-inside my-2" />,
        // 调整代码块样式
        code: ({ node, ...props }) => (
          <code {...props} className="bg-muted px-1 py-0.5 rounded text-sm font-mono" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
