/**
 * TheoryRenderer - Component hiển thị nội dung lý thuyết từ theoryModules
 * Hỗ trợ: heading, paragraph, infoBox, warningBox, tipBox, formula, table, image, video, code, html, list
 */

import React from 'react';

// Parse markdown-like formatting to JSX
const parseFormatting = (text) => {
  if (!text) return '';
  
  // Split text into parts with formatting
  const parts = [];
  let remaining = text;
  let key = 0;
  
  // Simple regex-based parsing
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|₍(.+?)₎|⁽(.+?)⁾)/g;
  let lastIndex = 0;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    
    if (match[2]) {
      // Bold **text**
      parts.push(<strong key={key++}>{match[2]}</strong>);
    } else if (match[3]) {
      // Italic *text*
      parts.push(<em key={key++}>{match[3]}</em>);
    } else if (match[4]) {
      // Subscript ₍text₎
      parts.push(<sub key={key++}>{match[4]}</sub>);
    } else if (match[5]) {
      // Superscript ⁽text⁾
      parts.push(<sup key={key++}>{match[5]}</sup>);
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

// Color schemes for boxes
const colorSchemes = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    title: 'text-blue-800',
    text: 'text-blue-700'
  },
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    title: 'text-green-800',
    text: 'text-green-700'
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    title: 'text-orange-800',
    text: 'text-orange-700'
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    title: 'text-red-800',
    text: 'text-red-700'
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    title: 'text-purple-800',
    text: 'text-purple-700'
  },
  gray: {
    bg: 'bg-gray-50',
    border: 'border-gray-200',
    title: 'text-gray-800',
    text: 'text-gray-700'
  }
};

// Icons for different box types
const BoxIcon = ({ type }) => {
  switch (type) {
    case 'warningBox':
      return <span className="text-lg">⚠️</span>;
    case 'tipBox':
      return <span className="text-lg">💡</span>;
    case 'infoBox':
    default:
      return <span className="text-lg">ℹ️</span>;
  }
};

// Module renderers
const HeadingModule = ({ content }) => {
  const { text, level = 'h2' } = content;
  const Tag = level;
  const styles = {
    h2: 'text-2xl font-bold text-gray-800 mt-6 mb-4',
    h3: 'text-xl font-semibold text-gray-800 mt-5 mb-3',
    h4: 'text-lg font-semibold text-gray-700 mt-4 mb-2'
  };
  
  return <Tag className={styles[level] || styles.h2}>{parseFormatting(text)}</Tag>;
};

const ParagraphModule = ({ content }) => {
  return (
    <p className="text-gray-700 leading-relaxed my-3">
      {parseFormatting(content.text)}
    </p>
  );
};

const ListModule = ({ content }) => {
  const { type = 'bullet', items = [] } = content;
  const Tag = type === 'number' ? 'ol' : 'ul';
  const listStyle = type === 'number' ? 'list-decimal' : 'list-disc';
  
  return (
    <Tag className={`${listStyle} pl-6 my-3 space-y-1 text-gray-700`}>
      {items.map((item, idx) => (
        <li key={idx} className="leading-relaxed">
          {parseFormatting(item)}
        </li>
      ))}
    </Tag>
  );
};

const BoxModule = ({ type, content }) => {
  const { title, content: boxContent, color = 'blue', listType = 'bullet' } = content;
  const scheme = colorSchemes[color] || colorSchemes.blue;
  
  // Split content by newlines for list items
  const lines = (boxContent || '').split('\n').filter(line => line.trim());
  
  return (
    <div className={`${scheme.bg} ${scheme.border} border rounded-xl p-4 my-4`}>
      {title && (
        <div className={`flex items-center gap-2 ${scheme.title} font-semibold mb-2`}>
          <BoxIcon type={type} />
          <span>{parseFormatting(title)}</span>
        </div>
      )}
      {lines.length > 1 ? (
        <ul className={`${scheme.text} space-y-1 ${listType === 'number' ? 'list-decimal' : 'list-disc'} pl-5`}>
          {lines.map((line, idx) => (
            <li key={idx} className="leading-relaxed">
              {parseFormatting(line)}
            </li>
          ))}
        </ul>
      ) : (
        <p className={`${scheme.text} leading-relaxed`}>
          {parseFormatting(boxContent)}
        </p>
      )}
    </div>
  );
};

const FormulaModule = ({ content }) => {
  const { formula, description } = content;
  
  return (
    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 my-4 text-center">
      <p className="text-xl font-semibold text-gray-800 font-mono">
        {parseFormatting(formula)}
      </p>
      {description && (
        <p className="text-sm text-gray-600 mt-2">
          {parseFormatting(description)}
        </p>
      )}
    </div>
  );
};

const TableModule = ({ content }) => {
  const { headers = [], rows = [] } = content;
  
  return (
    <div className="overflow-x-auto my-4">
      <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, idx) => (
              <th key={idx} className="border border-gray-200 px-4 py-2 text-left font-semibold text-gray-700">
                {parseFormatting(header)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className={rowIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="border border-gray-200 px-4 py-2 text-gray-700">
                  {parseFormatting(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ImageModule = ({ content }) => {
  const { url, alt = '', caption, size = 'full' } = content;
  
  const sizeClasses = {
    small: 'max-w-[25%]',
    medium: 'max-w-[50%]',
    large: 'max-w-[75%]',
    full: 'max-w-full'
  };
  
  return (
    <figure className="my-4 text-center">
      <img 
        src={url} 
        alt={alt}
        className={`${sizeClasses[size] || sizeClasses.full} mx-auto rounded-lg shadow-sm`}
        onError={(e) => {
          e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect fill="%23f3f4f6" width="200" height="100"/><text x="50%" y="50%" fill="%239ca3af" font-size="14" text-anchor="middle" dy=".3em">Không tải được ảnh</text></svg>';
        }}
      />
      {caption && (
        <figcaption className="mt-2 text-sm text-gray-600 italic">
          {parseFormatting(caption)}
        </figcaption>
      )}
    </figure>
  );
};

const VideoModule = ({ content }) => {
  const { url, caption } = content;
  
  // Extract YouTube video ID
  const getVideoId = (videoUrl) => {
    if (!videoUrl) return null;
    const match = videoUrl.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
    return match ? match[1] : null;
  };
  
  const videoId = getVideoId(url);
  
  if (!videoId) {
    return (
      <div className="my-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
        ⚠️ Video không hợp lệ
      </div>
    );
  }
  
  return (
    <div className="my-4">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          className="absolute top-0 left-0 w-full h-full rounded-lg"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title={caption || 'Video'}
        />
      </div>
      {caption && (
        <p className="mt-2 text-sm text-gray-600 text-center italic">
          {parseFormatting(caption)}
        </p>
      )}
    </div>
  );
};

const CodeModule = ({ content }) => {
  const { code, language = 'chemistry' } = content;
  
  return (
    <pre className="my-4 p-4 bg-slate-800 text-slate-100 rounded-lg overflow-x-auto font-mono text-sm">
      <code>{code}</code>
    </pre>
  );
};

const HtmlModule = ({ content }) => {
  const html = content.html || content.text || '';
  
  return (
    <div 
      className="my-4 prose prose-sm max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Main TheoryRenderer component
const TheoryRenderer = ({ modules = [], fallbackHtml = '' }) => {
  // If no modules, fallback to HTML
  if (!modules || modules.length === 0) {
    if (fallbackHtml) {
      return (
        <div 
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: fallbackHtml }}
        />
      );
    }
    return (
      <div className="text-gray-500 text-center py-8">
        Chưa có nội dung lý thuyết
      </div>
    );
  }
  
  return (
    <div className="theory-content">
      {modules.map((module, index) => {
        const key = module.id || `module-${index}`;
        
        switch (module.type) {
          case 'heading':
            return <HeadingModule key={key} content={module.content} />;
          
          case 'paragraph':
            return <ParagraphModule key={key} content={module.content} />;
          
          case 'list':
            return <ListModule key={key} content={module.content} />;
          
          case 'infoBox':
          case 'warningBox':
          case 'tipBox':
            return <BoxModule key={key} type={module.type} content={module.content} />;
          
          case 'formula':
            return <FormulaModule key={key} content={module.content} />;
          
          case 'table':
            return <TableModule key={key} content={module.content} />;
          
          case 'image':
            return <ImageModule key={key} content={module.content} />;
          
          case 'video':
            return <VideoModule key={key} content={module.content} />;
          
          case 'code':
            return <CodeModule key={key} content={module.content} />;
          
          case 'html':
            return <HtmlModule key={key} content={module.content} />;
          
          default:
            console.warn(`Unknown module type: ${module.type}`);
            return null;
        }
      })}
    </div>
  );
};

export default TheoryRenderer;
