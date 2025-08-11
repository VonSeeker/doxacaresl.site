'use client';

import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, MessageCircle, Bot, User } from 'lucide-react';
import { handleUserQuery } from '@/app/actions';
import { useAppContext } from '@/context/AppContext';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';
import { useFormState, useFormStatus } from 'react-dom';

interface Message {
  id: string;
  role: 'user' | 'bot';
  content: string;
}

interface ChatInterfaceProps {
  initialMessage?: string;
}

export function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const { language } = useAppContext();
  const t = translations[language];
  const scrollAreaRef = React.useRef<React.ElementRef<'div'>>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const formRef = React.useRef<HTMLFormElement>(null);

  const [state, formAction] = useFormState(handleUserQuery, {
    response: '',
    error: null,
  });

  React.useEffect(() => {
    // Add initial bot message
    setMessages([
        { id: 'welcome', role: 'bot', content: t.home.welcomeChatText }
    ]);
  }, [t.home.welcomeChatText]);

  React.useEffect(() => {
    if (initialMessage) {
      const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: initialMessage };
      setMessages(prev => [...prev, userMessage]);
      // Use a timeout to ensure state update before submitting
      setTimeout(() => {
        const formData = new FormData();
        formData.append('query', initialMessage);
        formAction(formData);
      }, 0);
    }
  }, [initialMessage, formAction]);


  React.useEffect(() => {
    if (state.response) {
      const botMessage: Message = { id: `bot-${Date.now()}`, role: 'bot', content: state.response };
      setMessages((prev) => [...prev.filter(m => m.id !== 'thinking'), botMessage]);
    } else if (state.error) {
        const errorMessage: Message = { id: `bot-${Date.now()}`, role: 'bot', content: `Sorry, something went wrong: ${state.error}` };
        setMessages((prev) => [...prev.filter(m => m.id !== 'thinking'), errorMessage]);
    }
  }, [state]);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const query = formData.get('query') as string;

    if (!query.trim()) return;

    const userMessage: Message = { id: `user-${Date.now()}`, role: 'user', content: query };
    const thinkingMessage: Message = { id: 'thinking', role: 'bot', content: '...' };

    setMessages((prev) => [...prev, userMessage, thinkingMessage]);
    
    formAction(formData);

    formRef.current?.reset();
  };

  React.useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if(viewport) {
             viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);


  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="bg-green-600 p-3">
        <CardTitle className="flex items-center font-bold text-white">
          <MessageCircle className="mr-2 h-5 w-5" />
          {t.home.chatTitle}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-64" ref={scrollAreaRef}>
          <div className="p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={cn('flex items-end gap-2', message.role === 'user' ? 'justify-end' : 'justify-start')}>
                {message.role === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-700 text-white"><Bot className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    'max-w-[75%] rounded-lg p-3 shadow-sm',
                    message.role === 'user' ? 'bg-green-100' : 'bg-white',
                    message.id === 'thinking' && 'animate-pulse'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
                 {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-300"><User className="h-5 w-5"/></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t border-gray-200 bg-gray-100 p-3">
          <form ref={formRef} onSubmit={handleFormSubmit} className="flex items-center">
            <Input
              name="query"
              placeholder={t.home.chatInputPlaceholder}
              className="flex-grow rounded-full border-gray-300 bg-white focus:ring-2 focus:ring-green-500"
              disabled={!!messages.find(m => m.id === 'thinking')}
            />
            <SubmitButton />
          </form>
        </div>
      </CardContent>
    </Card>
  );
}

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" size="icon" className="ml-2 shrink-0 rounded-full bg-green-600 text-white transition-colors hover:bg-green-700" disabled={pending}>
            <Send className="h-5 w-5" />
        </Button>
    )
}
