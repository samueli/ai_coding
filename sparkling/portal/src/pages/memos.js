import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { 
  Share2, 
  Trash2, 
  X, 
  BookOpen, 
  FileText, 
  Link as LinkIcon, 
  RotateCcw, 
  Save, 
  MessageSquare,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import MDEditor from '@uiw/react-md-editor';

const MarkdownContent = ({ content }) => {
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

export function Memos() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [memos, setMemos] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [selectedMemo, setSelectedMemo] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedSummary, setEditedSummary] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchMemos = async () => {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      navigate('/settings');
      return;
    }

    try {
      const response = await axios.get(`https://api.playwithai.fun/sparkling/query?token=${token}&page=${page}`);
      const newMemos = response.data.result || [];
      
      if (newMemos.length === 0) {
        setHasMore(false);
      } else {
        setMemos(prev => {
          const existingIds = new Set(prev.map(memo => memo.id));
          const uniqueNewMemos = newMemos.filter(memo => !existingIds.has(memo.id));
          return [...prev, ...uniqueNewMemos];
        });
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching memos:', error);
      if (error.response?.status === 401) {
        navigate('/settings');
      }
    }
  };

  useEffect(() => {
    fetchMemos();
  }, []);

  const handleOpenMemo = (memo) => {
    setSelectedMemo(memo);
    setEditedContent(memo.content || memo.notes || '');
    setEditedSummary(memo.ai_summary || '');
  };

  const handleReset = () => {
    if (selectedMemo) {
      setEditedContent(selectedMemo.content || selectedMemo.notes || '');
      setEditedSummary(selectedMemo.ai_summary || '');
    }
  };

  const handleSave = async () => {
    if (!selectedMemo) return;
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem('apiToken');
      await axios.post(`https://api.playwithai.fun/sparkling/update`, {
        token,
        id: selectedMemo.id,
        content: editedContent,
        ai_summary: editedSummary
      });

      // 更新本地数据
      setMemos(prevMemos => prevMemos.map(memo => 
        memo.id === selectedMemo.id 
          ? { ...memo, content: editedContent, ai_summary: editedSummary }
          : memo
      ));

      setSelectedMemo(null);
    } catch (error) {
      console.error('Error saving memo:', error);
      // 这里可以添加错误提示
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = (memo) => {
    // 实现分享功能
    console.log('Share memo:', memo);
  };

  const handleDelete = async (memoId) => {
    // 实现删除功能
    console.log('Delete memo:', memoId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderMemoContent = (memo) => {
    if (memo.ai_summary) {
      return (
        <div className="space-y-4">
          <div className="pt-8 px-6">
            <div className="text-base font-medium text-foreground mb-2">
              AI 总结
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground line-clamp-3">
              <MarkdownContent content={memo.ai_summary} />
            </div>
          </div>
          <div className="border-t pt-4 px-6">
            <div className="text-base font-medium text-foreground mb-2">
              原文内容
            </div>
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground line-clamp-3">
              <MarkdownContent content={memo.content} />
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="pt-8 px-6">
        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground line-clamp-6">
          <MarkdownContent content={memo.content || memo.notes} />
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <MessageSquare className="w-6 h-6" />
          {t('memos')}
        </h1>
        <div className="text-sm text-muted-foreground">
          {memos.length} {t('memos')}
        </div>
      </div>

      <InfiniteScroll
        dataLength={memos.length}
        next={fetchMemos}
        hasMore={hasMore}
        loader={
          <div className="text-center py-8 text-base flex items-center justify-center gap-2">
            <RotateCcw className="w-4 h-4 animate-spin" />
            {t('loading')}
          </div>
        }
        endMessage={
          <div className="text-center py-8 text-base text-muted-foreground flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            {t('noMoreMemos')}
          </div>
        }
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {memos.map((memo) => (
          <Dialog.Root key={memo.id} open={selectedMemo?.id === memo.id} onOpenChange={(open) => !open && setSelectedMemo(null)}>
            <Dialog.Trigger asChild>
              <Card 
                className="relative group h-[300px] flex flex-col cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/20"
                onClick={() => handleOpenMemo(memo)}
              >
                <div className="absolute top-3 right-3 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(memo);
                    }}
                    className="h-8 w-8 bg-background/95 hover:bg-background shadow-sm"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(memo.id);
                    }}
                    className="h-8 w-8 text-destructive bg-background/95 hover:bg-background shadow-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex-1 overflow-hidden">
                  {renderMemoContent(memo)}
                </div>
                <div className="px-6 py-4 mt-auto border-t bg-background/95 backdrop-blur-sm flex items-center justify-between rounded-b-lg">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="w-4 h-4" />
                    {formatDate(memo.create_time)}
                  </div>
                  {memo.url && (
                    <a
                      href={memo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-primary hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('viewOriginal')}
                    </a>
                  )}
                </div>
              </Card>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
              <Dialog.Content className="fixed right-0 top-0 h-full w-[600px] z-50 bg-background border-l shadow-lg outline-none">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      {t('editMemo')}
                    </h2>
                    <Dialog.Close asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-4 w-4" />
                      </Button>
                    </Dialog.Close>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div data-color-mode={theme === 'dark' ? 'dark' : 'light'}>
                      <MDEditor
                        value={editedContent}
                        onChange={setEditedContent}
                        preview="edit"
                        height={400}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        AI 摘要
                      </label>
                      <textarea
                        value={editedSummary}
                        onChange={(e) => setEditedSummary(e.target.value)}
                        className="w-full h-24 px-3 py-2 text-sm rounded-md border bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="p-4 border-t bg-background/95 backdrop-blur-sm flex items-center justify-end space-x-4">
                    <Button
                      variant="outline"
                      onClick={handleReset}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      {t('reset')}
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      {isSaving ? t('saving') : t('save')}
                    </Button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </InfiniteScroll>
    </div>
  );
}
