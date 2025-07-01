"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { actionCreateComment } from "@/server/actions/comment/action-create-comment";
import { actionGetAllComments } from "@/server/actions/comment/action-get-all-comments";
import { CommentReadBodySelect } from "@/types/comment";
import { MessageCircle, ThumbsUp } from "lucide-react";
import {
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";

export function OrderCommentsModal({
  trigger,
  orderId,
}: {
  trigger: ReactNode;
  orderId: string;
}) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState<CommentReadBodySelect[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const loadComments = useCallback(
    async (pageToLoad = 1) => {
      if (isLoading || !hasMore) return;
      setIsLoading(true);
      try {
        const res = await actionGetAllComments(orderId, pageToLoad, 10);
        const data = res?.data || [];
        const chunk = data.slice().reverse();
        setComments((prev) => (pageToLoad === 1 ? chunk : [...chunk, ...prev]));
        setPage(pageToLoad);
        setHasMore(pageToLoad < (res?.total || 0));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [
      isLoading,
      hasMore,
      orderId,
      setComments,
      setPage,
      setHasMore,
      setIsLoading,
    ],
  );

  useEffect(() => {
    if (open) {
      setComments([]);
      setPage(1);
      setHasMore(true);
      setIsLoading(false);
      if (inputRef.current) inputRef.current.value = "";
      setIsEmpty(true);
    }
  }, [open, orderId]);

  useEffect(() => {
    if (open && page === 1) {
      loadComments(1);
    }
  }, [open, page]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const handleScroll = () => {
      if (el.scrollTop < 100 && hasMore && !isLoading) {
        loadComments(page + 1);
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, [hasMore, isLoading, page]);

  useLayoutEffect(() => {
    if (viewportRef.current) {
      requestAnimationFrame(() => {
        viewportRef.current!.scrollTop = viewportRef.current!.scrollHeight;
      });
    }
  }, [comments]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const content = inputRef.current?.value.trim();
    if (!content) return;

    startTransition(async () => {
      try {
        const created = await actionCreateComment(orderId, content);
        setComments((prev) => [...prev, created]);
        if (inputRef.current) {
          inputRef.current.value = "";
          setIsEmpty(true);
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleInput = () => {
    const value = inputRef.current?.value ?? "";
    setIsEmpty(value.trim().length === 0);
  };

  const CommentCard = ({ comment }: { comment: CommentReadBodySelect }) => {
    const initials = `${comment.user.firstName?.[0] ?? ""}${comment.user.lastName?.[0] ?? ""}`;
    return (
      <div className="flex gap-4 py-3 border-b items-start">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between">
            <span className="font-semibold text-sm truncate">
              {comment.user.firstName} {comment.user.lastName}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date(comment.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <p className="text-sm mt-1 whitespace-pre-line">{comment.content}</p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" /> 0
            </div>
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
              <MessageCircle className="w-4 h-4" /> Reply
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white min-w-9/12 min-h-[90vh] max-h-[90vh] flex flex-col">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>Comments</DialogTitle>
          <DialogDescription>
            View and add comments for this order.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col flex-1 min-h-0">
          <ScrollArea ref={viewportRef} className="flex-1 overflow-y-auto p-4">
            {isLoading && comments.length === 0 && (
              <p className="text-xs text-muted-foreground text-center mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                Loading...
              </p>
            )}
            {comments.length > 0
              ? comments.map((c) => <CommentCard key={c.id} comment={c} />)
              : !isLoading && (
                  <p className="text-xs text-muted-foreground text-center mt-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    No comments yet.
                  </p>
                )}
            {isLoading && comments.length > 0 && (
              <p className="text-xs text-muted-foreground text-center mt-2 absolute top-0 left-1/2 transform -translate-x-1/2">
                Loading...
              </p>
            )}
          </ScrollArea>

          <form
            onSubmit={handleSubmit}
            className="border-t p-4 flex items-center gap-2"
          >
            <Textarea
              placeholder="Type your message..."
              ref={inputRef}
              onInput={handleInput}
              rows={3}
              className="flex-1 resize-none max-h-10"
            />
            <Button type="submit" disabled={isEmpty || isPending}>
              Send
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
