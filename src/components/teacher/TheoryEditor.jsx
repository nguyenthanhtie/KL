import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Trash2,
  GripVertical,
  ChevronUp,
  ChevronDown,
  Type,
  AlignLeft,
  List,
  Table,
  Image,
  Video,
  AlertCircle,
  Info,
  Lightbulb,
  Code,
  Calculator,
  Eye,
  EyeOff,
  Copy,
  FileCode,
  Bold,
  Italic,
  Subscript,
  Superscript,
  Upload,
  Link,
  ImagePlus
} from 'lucide-react';
import TheoryRenderer from '../TheoryRenderer';

// Helper: Parse markdown-like formatting to HTML
const parseFormatting = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/₍(.+?)₎/g, '<sub>$1</sub>')
    .replace(/⁽(.+?)⁾/g, '<sup>$1</sup>')
    .replace(/\n/g, '<br/>');
};

// Rich Text Toolbar Component
const FormattingToolbar = ({ textareaRef, value, onChange }) => {
  const applyFormat = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    // Check if text is already formatted
    const beforeText = value.substring(Math.max(0, start - before.length), start);
    const afterText = value.substring(end, end + after.length);
    
    let newValue;
    if (beforeText === before && afterText === after && selectedText) {
      // Remove formatting
      newValue = value.substring(0, start - before.length) + selectedText + value.substring(end + after.length);
    } else {
      // Add formatting
      newValue = value.substring(0, start) + before + selectedText + after + value.substring(end);
    }
    
    onChange(newValue);
    
    // Restore focus
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  return (
    <div className="flex items-center gap-1 mb-2 p-1 bg-gray-50 rounded-lg border border-gray-200">
      <button
        type="button"
        onClick={() => applyFormat('**', '**')}
        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
        title="In đậm (Ctrl+B)"
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => applyFormat('*', '*')}
        className="p-1.5 hover:bg-gray-200 rounded text-gray-600"
        title="In nghiêng (Ctrl+I)"
      >
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1" />
      <button
        type="button"
        onClick={() => applyFormat('₍', '₎')}
        className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-mono"
        title="Chỉ số dưới (subscript)"
      >
        X₂
      </button>
      <button
        type="button"
        onClick={() => applyFormat('⁽', '⁾')}
        className="p-1.5 hover:bg-gray-200 rounded text-gray-600 text-xs font-mono"
        title="Chỉ số trên (superscript)"
      >
        X²
      </button>
      <div className="w-px h-5 bg-gray-300 mx-1" />
      <span className="text-xs text-gray-400 px-2">
        Chọn text rồi bấm nút để format
      </span>
    </div>
  );
};

// Định nghĩa các loại module
const MODULE_TYPES = [
  { 
    type: 'heading', 
    label: 'Tiêu đề', 
    icon: Type,
    description: 'Tiêu đề lớn cho phần nội dung'
  },
  { 
    type: 'paragraph', 
    label: 'Đoạn văn', 
    icon: AlignLeft,
    description: 'Văn bản thông thường'
  },
  { 
    type: 'list', 
    label: 'Danh sách', 
    icon: List,
    description: 'Danh sách có dấu đầu dòng hoặc đánh số'
  },
  { 
    type: 'infoBox', 
    label: 'Hộp thông tin', 
    icon: Info,
    description: 'Highlight thông tin quan trọng'
  },
  { 
    type: 'warningBox', 
    label: 'Hộp cảnh báo', 
    icon: AlertCircle,
    description: 'Cảnh báo hoặc lưu ý'
  },
  { 
    type: 'tipBox', 
    label: 'Mẹo/Gợi ý', 
    icon: Lightbulb,
    description: 'Mẹo học tập hoặc gợi ý'
  },
  { 
    type: 'formula', 
    label: 'Công thức', 
    icon: Calculator,
    description: 'Công thức hóa học hoặc toán học'
  },
  { 
    type: 'table', 
    label: 'Bảng', 
    icon: Table,
    description: 'Bảng dữ liệu'
  },
  { 
    type: 'image', 
    label: 'Hình ảnh', 
    icon: Image,
    description: 'Chèn hình ảnh minh họa'
  },
  { 
    type: 'video', 
    label: 'Video', 
    icon: Video,
    description: 'Nhúng video YouTube'
  },
  { 
    type: 'code', 
    label: 'Code/Ví dụ', 
    icon: Code,
    description: 'Khối code hoặc ví dụ'
  },
  { 
    type: 'html', 
    label: 'HTML tùy chỉnh', 
    icon: FileCode,
    description: 'Nội dung HTML tự do (cho nội dung cũ)'
  }
];

// Template mặc định cho mỗi loại module
const getDefaultContent = (type) => {
  switch (type) {
    case 'heading':
      return { text: '', level: 'h2' };
    case 'paragraph':
      return { text: '' };
    case 'list':
      return { 
        type: 'bullet', // bullet hoặc number
        items: ['', '', ''] 
      };
    case 'infoBox':
      return { 
        title: '',
        content: '',
        color: 'blue'
      };
    case 'warningBox':
      return { 
        title: '',
        content: '',
        color: 'orange'
      };
    case 'tipBox':
      return { 
        title: '',
        content: '',
        color: 'green'
      };
    case 'formula':
      return { 
        formula: '',
        description: ''
      };
    case 'table':
      return {
        headers: ['', '', ''],
        rows: [
          ['', '', ''],
          ['', '', '']
        ]
      };
    case 'image':
      return { 
        url: '',
        alt: 'Mô tả hình ảnh',
        caption: ''
      };
    case 'video':
      return { 
        url: '',
        caption: ''
      };
    case 'code':
      return { 
        language: 'chemistry',
        code: ''
      };
    case 'html':
      return { 
        html: ''
      };
    default:
      return {};
  }
};

// Component render từng loại module
const ModuleRenderer = ({ module, onChange, onRemove, onMove, index, total }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const textareaRef = useRef(null);
  const boxContentRef = useRef(null);
  
  const updateContent = (field, value) => {
    onChange({ ...module, content: { ...module.content, [field]: value } });
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e, field) => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'b') {
        e.preventDefault();
        applyFormatToField(field, '**', '**');
      } else if (e.key === 'i') {
        e.preventDefault();
        applyFormatToField(field, '*', '*');
      }
    }
  };

  const applyFormatToField = (field, before, after) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentValue = module.content[field] || '';
    const selectedText = currentValue.substring(start, end);
    
    const newValue = currentValue.substring(0, start) + before + selectedText + after + currentValue.substring(end);
    updateContent(field, newValue);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, end + before.length);
    }, 0);
  };

  const renderEditor = () => {
    switch (module.type) {
      case 'heading':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cấp độ</label>
              <select
                value={module.content.level}
                onChange={(e) => updateContent('level', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="h2">Tiêu đề lớn (H2)</option>
                <option value="h3">Tiêu đề vừa (H3)</option>
                <option value="h4">Tiêu đề nhỏ (H4)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <input
                type="text"
                value={module.content.text}
                onChange={(e) => updateContent('text', e.target.value)}
                placeholder="Nhập tiêu đề..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-lg font-semibold"
              />
            </div>
          </div>
        );

      case 'paragraph':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
            <FormattingToolbar
              textareaRef={textareaRef}
              value={module.content.text || ''}
              onChange={(v) => updateContent('text', v)}
            />
            <textarea
              ref={textareaRef}
              value={module.content.text}
              onChange={(e) => updateContent('text', e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, 'text')}
              rows={4}
              placeholder="Nhập nội dung đoạn văn... (Dùng **text** để in đậm, *text* để in nghiêng)"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-y min-h-[100px]"
            />
            {module.content.text && (
              <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500 block mb-1">Xem trước:</span>
                <div 
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{ __html: parseFormatting(module.content.text) }}
                />
              </div>
            )}
          </div>
        );

      case 'list':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kiểu danh sách</label>
              <select
                value={module.content.type}
                onChange={(e) => updateContent('type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="bullet">Dấu đầu dòng (•)</option>
                <option value="number">Đánh số (1, 2, 3)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Các mục</label>
              {module.content.items.map((item, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  <span className="px-2 py-2 bg-gray-100 rounded text-sm">
                    {module.content.type === 'number' ? `${idx + 1}.` : '•'}
                  </span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...module.content.items];
                      newItems[idx] = e.target.value;
                      updateContent('items', newItems);
                    }}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      const newItems = module.content.items.filter((_, i) => i !== idx);
                      updateContent('items', newItems);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => updateContent('items', [...module.content.items, ''])}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Thêm mục
              </button>
            </div>
          </div>
        );

      case 'infoBox':
      case 'warningBox':
      case 'tipBox': {
        const colorOptions = [
          { value: 'blue', label: 'Xanh dương', bg: 'bg-blue-50', border: 'border-blue-200' },
          { value: 'green', label: 'Xanh lá', bg: 'bg-green-50', border: 'border-green-200' },
          { value: 'orange', label: 'Cam', bg: 'bg-orange-50', border: 'border-orange-200' },
          { value: 'red', label: 'Đỏ', bg: 'bg-red-50', border: 'border-red-200' },
          { value: 'purple', label: 'Tím', bg: 'bg-purple-50', border: 'border-purple-200' },
          { value: 'gray', label: 'Xám', bg: 'bg-gray-50', border: 'border-gray-200' }
        ];
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <input
                type="text"
                value={module.content.title}
                onChange={(e) => updateContent('title', e.target.value)}
                placeholder="Nhập tiêu đề hộp..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <FormattingToolbar
                textareaRef={boxContentRef}
                value={module.content.content || ''}
                onChange={(v) => updateContent('content', v)}
              />
              <textarea
                ref={boxContentRef}
                value={module.content.content}
                onChange={(e) => updateContent('content', e.target.value)}
                rows={3}
                placeholder="Nhập nội dung... (Dùng **text** để in đậm, *text* để in nghiêng, mỗi dòng là 1 mục)"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg resize-y min-h-[80px]"
              />
              <p className="text-xs text-gray-500 mt-1">Mỗi dòng sẽ hiển thị như 1 bullet point</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Màu sắc</label>
              <div className="flex gap-2 flex-wrap">
                {colorOptions.map(color => (
                  <button
                    key={color.value}
                    onClick={() => updateContent('color', color.value)}
                    className={`px-3 py-1 rounded-full text-sm border-2 ${color.bg} ${
                      module.content.color === color.value ? 'ring-2 ring-blue-500' : ''
                    }`}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
            </div>
            {/* Preview */}
            {(module.content.title || module.content.content) && (
              <div className={`p-3 rounded-lg border ${colorOptions.find(c => c.value === module.content.color)?.bg || 'bg-gray-50'}`}>
                <span className="text-xs text-gray-500 block mb-1">Xem trước:</span>
                {module.content.title && <h4 className="font-semibold mb-1">{module.content.title}</h4>}
                <ul className="text-sm pl-4 list-disc">
                  {(module.content.content || '').split('\n').filter(line => line.trim()).map((line, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: parseFormatting(line) }} />
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }

      case 'formula':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Công thức</label>
              <input
                type="text"
                value={module.content.formula}
                onChange={(e) => updateContent('formula', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono"
                placeholder="VD: H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Dùng ₂ ₃ ₄ cho số dưới, ⁺ ⁻ cho ion
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả (tùy chọn)</label>
              <input
                type="text"
                value={module.content.description}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="Mô tả ý nghĩa công thức..."
              />
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề cột</label>
              <div className="flex gap-2 flex-wrap">
                {module.content.headers.map((header, idx) => (
                  <input
                    key={idx}
                    type="text"
                    value={header}
                    onChange={(e) => {
                      const newHeaders = [...module.content.headers];
                      newHeaders[idx] = e.target.value;
                      updateContent('headers', newHeaders);
                    }}
                    className="flex-1 min-w-[100px] px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium"
                  />
                ))}
                <button
                  onClick={() => {
                    updateContent('headers', [...module.content.headers, `Cột ${module.content.headers.length + 1}`]);
                    updateContent('rows', module.content.rows.map(row => [...row, '']));
                  }}
                  className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm"
                >
                  + Cột
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Dữ liệu</label>
              {module.content.rows.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-2 mb-2">
                  {row.map((cell, cellIdx) => (
                    <input
                      key={cellIdx}
                      type="text"
                      value={cell}
                      onChange={(e) => {
                        const newRows = [...module.content.rows];
                        newRows[rowIdx][cellIdx] = e.target.value;
                        updateContent('rows', newRows);
                      }}
                      className="flex-1 min-w-[100px] px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                  ))}
                  <button
                    onClick={() => {
                      const newRows = module.content.rows.filter((_, i) => i !== rowIdx);
                      updateContent('rows', newRows);
                    }}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <button
                onClick={() => {
                  const newRow = new Array(module.content.headers.length).fill('');
                  updateContent('rows', [...module.content.rows, newRow]);
                }}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                + Thêm hàng
              </button>
            </div>
          </div>
        );

      case 'image':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL hình ảnh</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={module.content.url}
                  onChange={(e) => updateContent('url', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="https://example.com/image.jpg hoặc /images/..."
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Hỗ trợ: URL trực tiếp, hoặc đường dẫn trong thư mục /public/images/
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả alt</label>
                <input
                  type="text"
                  value={module.content.alt}
                  onChange={(e) => updateContent('alt', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  placeholder="Mô tả hình ảnh cho accessibility"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước</label>
                <select
                  value={module.content.size || 'full'}
                  onChange={(e) => updateContent('size', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                >
                  <option value="small">Nhỏ (25%)</option>
                  <option value="medium">Vừa (50%)</option>
                  <option value="large">Lớn (75%)</option>
                  <option value="full">Đầy đủ (100%)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chú thích (tùy chọn)</label>
              <input
                type="text"
                value={module.content.caption}
                onChange={(e) => updateContent('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="Chú thích hiển thị dưới hình"
              />
            </div>
            {/* Preview */}
            {module.content.url && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500 block mb-2">Xem trước:</span>
                <figure className="text-center">
                  <img 
                    src={module.content.url} 
                    alt={module.content.alt || 'Preview'}
                    className={`rounded-lg border mx-auto ${
                      module.content.size === 'small' ? 'max-w-[25%]' :
                      module.content.size === 'medium' ? 'max-w-[50%]' :
                      module.content.size === 'large' ? 'max-w-[75%]' : 'max-w-full'
                    }`}
                    style={{ maxHeight: '200px' }}
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="100"><rect fill="%23f3f4f6" width="200" height="100"/><text x="50%" y="50%" fill="%239ca3af" font-size="14" text-anchor="middle" dy=".3em">Không tải được ảnh</text></svg>';
                    }}
                  />
                  {module.content.caption && (
                    <figcaption className="mt-2 text-sm text-gray-600">{module.content.caption}</figcaption>
                  )}
                </figure>
              </div>
            )}
          </div>
        );

      case 'video': {
        const getVideoId = (url) => {
          if (!url) return null;
          const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/);
          return match ? match[1] : null;
        };
        const videoId = getVideoId(module.content.url);
        
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL Video</label>
              <input
                type="text"
                value={module.content.url}
                onChange={(e) => updateContent('url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                placeholder="https://www.youtube.com/watch?v=... hoặc https://youtu.be/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Hỗ trợ: YouTube (watch, embed, youtu.be)
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chú thích (tùy chọn)</label>
              <input
                type="text"
                value={module.content.caption}
                onChange={(e) => updateContent('caption', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              />
            </div>
            {/* Video Preview */}
            {videoId && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-xs text-gray-500 block mb-2">Xem trước:</span>
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    className="absolute top-0 left-0 w-full h-full rounded-lg"
                    frameBorder="0"
                    allowFullScreen
                  />
                </div>
                {module.content.caption && (
                  <p className="mt-2 text-sm text-gray-600 text-center">{module.content.caption}</p>
                )}
              </div>
            )}
            {module.content.url && !videoId && (
              <div className="p-3 bg-red-50 rounded-lg text-red-600 text-sm">
                ⚠️ Không thể nhận dạng URL video. Vui lòng kiểm tra lại link YouTube.
              </div>
            )}
          </div>
        );
      }

      case 'code':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại</label>
              <select
                value={module.content.language}
                onChange={(e) => updateContent('language', e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg"
              >
                <option value="chemistry">Phương trình hóa học</option>
                <option value="example">Ví dụ</option>
                <option value="note">Ghi chú</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
              <textarea
                value={module.content.code}
                onChange={(e) => updateContent('code', e.target.value)}
                rows={4}
                placeholder="Nhập công thức, ví dụ..."
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm resize-y min-h-[100px]"
              />
            </div>
          </div>
        );

      case 'html':
        return (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung HTML</label>
              <textarea
                value={module.content.html || module.content.text || ''}
                onChange={(e) => updateContent('html', e.target.value)}
                rows={8}
                placeholder="<p>Nội dung HTML tùy chỉnh...</p>"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg font-mono text-sm resize-y min-h-[150px]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Xem trước</label>
              <div 
                className="p-4 border border-gray-200 rounded-lg prose prose-sm max-w-none bg-white"
                dangerouslySetInnerHTML={{ __html: module.content.html || module.content.text || '' }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const ModuleIcon = MODULE_TYPES.find(m => m.type === module.type)?.icon || AlignLeft;
  const moduleLabel = MODULE_TYPES.find(m => m.type === module.type)?.label || module.type;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
        <button className="p-1 text-gray-400 cursor-grab hover:text-gray-600">
          <GripVertical className="w-4 h-4" />
        </button>
        <ModuleIcon className="w-4 h-4 text-gray-500" />
        <span className="font-medium text-gray-700 flex-1">{moduleLabel}</span>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => onMove(index, -1)}
            disabled={index === 0}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            title="Di chuyển lên"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMove(index, 1)}
            disabled={index === total - 1}
            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
            title="Di chuyển xuống"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-gray-400 hover:text-gray-600"
            title={isExpanded ? 'Thu gọn' : 'Mở rộng'}
          >
            {isExpanded ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            onClick={onRemove}
            className="p-1 text-red-400 hover:text-red-600"
            title="Xóa"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      {isExpanded && (
        <div className="p-4">
          {renderEditor()}
        </div>
      )}
    </div>
  );
};

// Main TheoryEditor component
const TheoryEditor = ({ value, onChange }) => {
  const [modules, setModules] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [showModuleMenu, setShowModuleMenu] = useState(false);

  // Sync modules when value prop changes (e.g., when lesson is loaded)
  useEffect(() => {
    if (value && Array.isArray(value) && value.length > 0) {
      setModules(value);
    } else if (value && typeof value === 'object' && Array.isArray(value.modules)) {
      setModules(value.modules);
    }
  }, [value]);

  // Update parent when modules change
  const updateModules = (newModules) => {
    setModules(newModules);
    onChange({
      modules: newModules,
      html: generateHTML(newModules)
    });
  };

  const addModule = (type) => {
    const newModule = {
      id: Date.now(),
      type,
      content: getDefaultContent(type)
    };
    updateModules([...modules, newModule]);
    setShowModuleMenu(false);
  };

  const updateModule = (index, updatedModule) => {
    const newModules = [...modules];
    newModules[index] = updatedModule;
    updateModules(newModules);
  };

  const removeModule = (index) => {
    updateModules(modules.filter((_, i) => i !== index));
  };

  const moveModule = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= modules.length) return;
    
    const newModules = [...modules];
    [newModules[index], newModules[newIndex]] = [newModules[newIndex], newModules[index]];
    updateModules(newModules);
  };

  // Generate HTML from modules
  const generateHTML = (mods) => {
    // Helper to convert markdown-style formatting to HTML
    const formatText = (text) => {
      if (!text) return '';
      return text
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        .replace(/₍(.+?)₎/g, '<sub>$1</sub>')
        .replace(/⁽(.+?)⁾/g, '<sup>$1</sup>');
    };

    return mods.map(mod => {
      switch (mod.type) {
        case 'heading': {
          const Tag = mod.content.level || 'h2';
          return `<${Tag} style="margin:16px 0 8px; color:#0f172a; font-weight:600;">${formatText(mod.content.text)}</${Tag}>`;
        }
        
        case 'paragraph':
          return `<p style="margin:10px 0; color:#334155; line-height:1.6;">${formatText(mod.content.text)}</p>`;
        
        case 'list': {
          const listTag = mod.content.type === 'number' ? 'ol' : 'ul';
          const items = mod.content.items.map(item => `<li>${formatText(item)}</li>`).join('');
          return `<${listTag} style="margin:10px 0; padding-left:24px; color:#334155;">${items}</${listTag}>`;
        }
        
        case 'infoBox':
        case 'warningBox':
        case 'tipBox': {
          const colors = {
            blue: { bg: '#eff6ff', border: '#bfdbfe', text: '#1e40af' },
            green: { bg: '#f0fdf4', border: '#bbf7d0', text: '#166534' },
            orange: { bg: '#fff7ed', border: '#fed7aa', text: '#9a3412' },
            red: { bg: '#fef2f2', border: '#fecaca', text: '#991b1b' },
            purple: { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8' },
            gray: { bg: '#f9fafb', border: '#e5e7eb', text: '#374151' }
          };
          const c = colors[mod.content.color] || colors.blue;
          // Convert content lines to list items
          const contentLines = (mod.content.content || '').split('\n').filter(line => line.trim());
          const contentHtml = contentLines.length > 1 
            ? `<ul style="margin:0; padding-left:18px;">${contentLines.map(line => `<li>${formatText(line)}</li>`).join('')}</ul>`
            : `<p style="margin:0;">${formatText(mod.content.content || '')}</p>`;
          
          return `<div style="padding:14px; border:1px solid ${c.border}; border-radius:10px; background:${c.bg}; margin:14px 0;">
            ${mod.content.title ? `<h4 style="margin:0 0 8px; color:${c.text}; font-weight:600;">${formatText(mod.content.title)}</h4>` : ''}
            <div style="color:${c.text};">${contentHtml}</div>
          </div>`;
        }

        
        case 'formula':
          return `<div style="padding:16px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; margin:14px 0; text-align:center;">
            <p style="font-size:1.25rem; font-weight:600; color:#0f172a; margin:0;">${formatText(mod.content.formula)}</p>
            ${mod.content.description ? `<p style="margin:8px 0 0; color:#64748b; font-size:0.875rem;">${formatText(mod.content.description)}</p>` : ''}
          </div>`;
        
        case 'table': {
          const headerCells = mod.content.headers.map(h => `<th style="padding:10px; border:1px solid #e2e8f0; background:#f1f5f9; font-weight:600;">${formatText(h)}</th>`).join('');
          const bodyRows = mod.content.rows.map(row => 
            `<tr>${row.map(cell => `<td style="padding:10px; border:1px solid #e2e8f0;">${formatText(cell)}</td>`).join('')}</tr>`
          ).join('');
          return `<table style="width:100%; border-collapse:collapse; margin:14px 0;">
            <thead><tr>${headerCells}</tr></thead>
            <tbody>${bodyRows}</tbody>
          </table>`;
        }
        
        case 'image': {
          const sizeMap = { small: '25%', medium: '50%', large: '75%', full: '100%' };
          const imgSize = sizeMap[mod.content.size] || '100%';
          return `<figure style="margin:14px 0; text-align:center;">
            <img src="${mod.content.url}" alt="${mod.content.alt || ''}" style="max-width:${imgSize}; border-radius:8px;" />
            ${mod.content.caption ? `<figcaption style="margin-top:8px; color:#64748b; font-size:0.875rem;">${formatText(mod.content.caption)}</figcaption>` : ''}
          </figure>`;
        }
        
        case 'video': {
          const videoId = mod.content.url?.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/)?.[1];
          if (!videoId) return '';
          return `<div style="margin:14px 0;">
            <div style="position:relative; padding-bottom:56.25%; height:0; overflow:hidden; border-radius:8px;">
              <iframe src="https://www.youtube.com/embed/${videoId}" style="position:absolute; top:0; left:0; width:100%; height:100%; border:0;" allowfullscreen></iframe>
            </div>
            ${mod.content.caption ? `<p style="margin-top:8px; color:#64748b; font-size:0.875rem; text-align:center;">${formatText(mod.content.caption)}</p>` : ''}
          </div>`;
        }
        
        case 'code':
          return `<pre style="padding:14px; background:#1e293b; color:#e2e8f0; border-radius:8px; margin:14px 0; overflow-x:auto; font-family:monospace;"><code>${mod.content.code}</code></pre>`;
        
        case 'html':
          // Trả về nội dung HTML nguyên bản
          return mod.content.html || mod.content.text || '';
        
        default:
          return '';
      }
    }).join('\n');
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <button
            onClick={() => setShowModuleMenu(!showModuleMenu)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Thêm module
          </button>
          
          {showModuleMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 z-10 max-h-96 overflow-y-auto">
              {MODULE_TYPES.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.type}
                    onClick={() => addModule(type.type)}
                    className="w-full flex items-start gap-3 px-4 py-3 hover:bg-gray-50 text-left"
                  >
                    <Icon className="w-5 h-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">{type.label}</p>
                      <p className="text-xs text-gray-500">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        <button
          onClick={() => setShowPreview(!showPreview)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            showPreview ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Đang xem trước' : 'Xem trước'}
        </button>
      </div>

      {/* Module list or Preview */}
      {showPreview ? (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-4">Xem trước nội dung (như học sinh sẽ thấy)</h3>
          <TheoryRenderer modules={modules} />
        </div>
      ) : (
        <div className="space-y-3">
          {modules.length === 0 ? (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
              <p className="text-gray-500 mb-4">Chưa có nội dung nào. Hãy thêm module để bắt đầu.</p>
              <button
                onClick={() => setShowModuleMenu(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Thêm module đầu tiên
              </button>
            </div>
          ) : (
            modules.map((module, index) => (
              <ModuleRenderer
                key={module.id}
                module={module}
                index={index}
                total={modules.length}
                onChange={(updated) => updateModule(index, updated)}
                onRemove={() => removeModule(index)}
                onMove={moveModule}
              />
            ))
          )}
        </div>
      )}

      {/* Quick add buttons */}
      {modules.length > 0 && !showPreview && (
        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
          <span className="text-sm text-gray-500 py-1">Thêm nhanh:</span>
          {MODULE_TYPES.slice(0, 6).map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.type}
                onClick={() => addModule(type.type)}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600"
              >
                <Icon className="w-3 h-3" />
                {type.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TheoryEditor;
