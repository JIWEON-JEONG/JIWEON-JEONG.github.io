import { useEffect, useMemo } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Import Prism.js for syntax highlighting
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
  isHtml?: boolean;
}

const configureMarked = () => {
  marked.setOptions({
    breaks: true,
    gfm: true,
  });

  // Configure marked to use Prism for syntax highlighting
  const renderer = new marked.Renderer();
  const originalCode = renderer.code.bind(renderer);

  renderer.code = function(code: string, language?: string, escaped?: boolean) {
    if (language && Prism.languages[language]) {
      try {
        const highlighted = Prism.highlight(code, Prism.languages[language], language);
        return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
      } catch (err) {
        console.warn(`Failed to highlight code for language: ${language}`, err);
      }
    }
    return originalCode(code, language || '', escaped || false);
  };

  marked.use({ renderer });
};

export const MarkdownRenderer = ({ content, className = '', isHtml = false }: MarkdownRendererProps) => {
  // Configure marked on component mount
  useEffect(() => {
    if (!isHtml) {
      configureMarked();
    }
  }, [isHtml]);

  const htmlContent = useMemo(() => {
    if (!content) return '';

    try {
      const rawHtml = isHtml ? content : (marked(content) as string);

      // Sanitize HTML to prevent XSS
      const sanitizedHtml = DOMPurify.sanitize(rawHtml, {
        ALLOWED_TAGS: [
          'p', 'br', 'strong', 'em', 'u', 's', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
          'ul', 'ol', 'li', 'blockquote', 'pre', 'code', 'a', 'img', 'hr',
          'table', 'thead', 'tbody', 'tr', 'th', 'td',
          'div', 'span', 'del', 'ins', 'figure', 'figcaption', 'picture', 'source',
          'iframe', 'video', 'audio', 'sup', 'sub', 'mark', 'details', 'summary'
        ],
        ALLOWED_ATTR: [
          'href', 'src', 'alt', 'title', 'class', 'id', 'target', 'rel',
          'width', 'height', 'loading', 'srcset', 'sizes', 'type', 'media',
          'allow', 'allowfullscreen', 'frameborder', 'name', 'open',
          'style', 'data-src'
        ],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp|data):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
      });

      return sanitizedHtml;
    } catch (err) {
      console.error('Error rendering markdown:', err);
      return '<p>Error rendering content</p>';
    }
  }, [content, isHtml]);

  // Re-run Prism highlighting after content changes
  useEffect(() => {
    Prism.highlightAll();
  }, [htmlContent]);

  if (!content) {
    return (
      <div className={`prose dark:prose-invert max-w-none ${className}`}>
        <p className="text-gray-500 italic">No content available</p>
      </div>
    );
  }

  return (
    <div 
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};