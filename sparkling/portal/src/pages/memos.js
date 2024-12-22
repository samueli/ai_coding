import React, { useState, useEffect, useCallback, useRef } from 'react';
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
  ExternalLink,
  Globe,
  PenLine,
  Plus,
  Tag
} from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import MDEditor from '@uiw/react-md-editor';
import { MarkdownContent } from '../components/markdown-content';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip"

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
  const [isLoading, setIsLoading] = useState(false);
  const [editingTags, setEditingTags] = useState(false);
  const [selectedMemoForTags, setSelectedMemoForTags] = useState(null);
  const [editedTags, setEditedTags] = useState([]);
  const [isAiSummaryExpanded, setIsAiSummaryExpanded] = useState(false);
  const loadingRef = useRef(false);

  const fetchMemos = useCallback(async () => {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      navigate('/settings');
      return;
    }

    if (loadingRef.current) return;
    loadingRef.current = true;
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
      loadingRef.current = false;
    }
  }, [navigate, page]);

  useEffect(() => {
    const token = localStorage.getItem('apiToken');
    if (!token) {
      navigate('/settings');
      return;
    }

    // 只在组件首次挂载时加载数据
    if (page === 1 && memos.length === 0 && !loadingRef.current) {
      fetchMemos();
    }
  }, [fetchMemos, navigate, page, memos.length]);

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore && !loadingRef.current) {
      fetchMemos();
    }
  }, [fetchMemos, isLoading, hasMore]);

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

  const handleShare = (e, memo) => {
    e.stopPropagation();
    // TODO: 实现分享功能
  };

  const handleDelete = (e, memo) => {
    e.stopPropagation();
    handleDeleteMemo(memo.id);
  };

  const handleDeleteMemo = async (id) => {
    // 实现删除功能
    console.log('Delete memo:', id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSaveTags = async () => {
    if (!selectedMemoForTags) return;
    
    setIsSaving(true);
    try {
      const token = localStorage.getItem('apiToken');
      await axios.post(`https://api.playwithai.fun/sparkling/update`, {
        token,
        id: selectedMemoForTags.id,
        ai_tags: JSON.stringify(editedTags)
      });

      // 更新本地数据
      setMemos(prevMemos => prevMemos.map(memo => 
        memo.id === selectedMemoForTags.id 
          ? { ...memo, ai_tags: JSON.stringify(editedTags) }
          : memo
      ));

      setEditingTags(false);
      setSelectedMemoForTags(null);
      setEditedTags([]);
    } catch (error) {
      console.error('Error saving tags:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = (tag) => {
    if (editedTags.length < 3 && tag.trim()) {
      setEditedTags(prev => [...prev, tag.trim()]);
    }
  };

  const handleRemoveTag = (index) => {
    setEditedTags(prev => prev.filter((_, i) => i !== index));
  };

  const handleOpenTagsDialog = (memo, e) => {
    e.stopPropagation();
    setSelectedMemoForTags(memo);
    setEditedTags(memo.ai_tags ? JSON.parse(memo.ai_tags) : []);
    setEditingTags(true);
  };

  const renderMemoContent = (memo) => {
    const tags = memo.ai_tags ? JSON.parse(memo.ai_tags).slice(0, 3) : [];
    const content = memo.ai_summary || memo.content || memo.notes || '';
    
    return (
      <div className="flex flex-col h-full">
        <div className="px-6 pt-6 pb-2 min-h-[48px] flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
            >
              {tag}
            </span>
          ))}
          {tags.length < 3 && (
            <button
              onClick={(e) => handleOpenTagsDialog(memo, e)}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs font-medium text-muted hover:bg-muted/80 transition-colors"
            >
              <Plus className="w-3 h-3 mr-1" />
              {t('addTags')}
            </button>
          )}
        </div>
        <div className="px-6 flex-1 overflow-hidden">
          <div className="prose prose-sm dark:prose-invert max-w-none text-foreground line-clamp-6">
            <MarkdownContent content={content} />
          </div>
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
        next={loadMore}
        hasMore={hasMore && !isLoading}
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
                <div className="absolute top-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-background/95 hover:bg-background shadow-sm"
                          onClick={(e) => handleShare(e, memo)}
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{t('shareMemo')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive bg-background/95 hover:bg-background shadow-sm"
                          onClick={(e) => handleDelete(e, memo)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{t('deleteMemo')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="flex-1 overflow-hidden">
                  {renderMemoContent(memo)}
                </div>
                <div className="px-6 py-4 mt-auto border-t bg-background/95 backdrop-blur-sm flex items-center justify-between rounded-b-lg">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                    {memo.url ? (
                      <Globe className="w-3.5 h-3.5" />
                    ) : (
                      <PenLine className="w-3.5 h-3.5" />
                    )}
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
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          {t('editMemo')}
                        </label>
                        <MDEditor
                          value={editedContent}
                          onChange={setEditedContent}
                          preview="edit"
                          height={200}
                          className="border rounded-md"
                        />
                      </div>
                    </div>
                    {selectedMemo?.ai_summary && (
                      <div className="space-y-2 mt-8">
                        <label className="text-sm font-medium flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          AI {t('summary')}
                        </label>
                        <div 
                          className={`relative cursor-pointer transition-all duration-300 ${isAiSummaryExpanded ? 'h-auto' : 'h-[200px]'}`}
                          onClick={() => setIsAiSummaryExpanded(!isAiSummaryExpanded)}
                        >
                          <div className={`w-full p-3 bg-muted/50 rounded-md text-sm text-muted-foreground overflow-y-auto ${isAiSummaryExpanded ? 'max-h-[400px]' : 'h-full overflow-hidden'}`}>
                            <MarkdownContent content={selectedMemo.ai_summary} />
                          </div>
                          {!isAiSummaryExpanded && (
                            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent pointer-events-none" />
                          )}
                        </div>
                      </div>
                    )}
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

      <Dialog.Root open={editingTags} onOpenChange={(open) => !open && setEditingTags(false)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[400px] z-50 bg-background rounded-lg border shadow-lg outline-none">
            <div className="flex flex-col">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Tag className="w-5 h-5" />
                  {t('editTags')}
                </h2>
                <Dialog.Close asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                  </Button>
                </Dialog.Close>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {editedTags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 group"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(index)}
                        className="ml-1 text-primary/60 hover:text-primary"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                {editedTags.length < 3 && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder={t('enterTagsHint')}
                      className="flex-1 px-3 py-2 text-sm rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                )}
                <div className="text-xs text-muted-foreground">
                  {t('tagsLimit')}
                </div>
              </div>
              <div className="p-4 border-t bg-background/95 backdrop-blur-sm flex items-center justify-end space-x-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingTags(false);
                    setSelectedMemoForTags(null);
                    setEditedTags([]);
                  }}
                  disabled={isSaving}
                >
                  {t('cancel')}
                </Button>
                <Button
                  onClick={handleSaveTags}
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
    </div>
  );
};
