'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon, CheckCircle2 } from 'lucide-react';
import { format, addMonths, startOfToday, isBefore, isAfter } from 'date-fns';
import { ja } from 'date-fns/locale';
import { useToast } from '@/hooks/use-toast';
import ClientAnimationProvider from '@/components/providers/ClientAnimationProvider';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'お名前は2文字以上で入力してください',
  }),
  age: z.string().min(1, {
    message: '年齢を選択してください',
  }),
  email: z.string().email({
    message: '有効なメールアドレスを入力してください',
  }),
  phone: z.string().min(10, {
    message: '電話番号を正しく入力してください',
  }),
  preferredDate: z.date({
    required_error: '希望日を選択してください',
  }),
  preferredTime: z.string().min(1, {
    message: '希望時間帯を選択してください',
  }),
  workLocation: z.string().min(1, {
    message: '希望勤務形態を選択してください',
  }),
  message: z.string().optional(),
  agreeTerms: z.literal(true, {
    errorMap: () => ({ message: '利用規約に同意してください' }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

function ApplicationContent() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const today = startOfToday();
  const twoMonthsFromNow = addMonths(today, 2);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const section = sectionRef.current;
    const title = titleRef.current;
    const formElement = formRef.current;

    if (!section || !title || !formElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.fromTo(title,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(formElement,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8 },
      '-=0.4'
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isMounted]);

  function onSubmit(data: FormValues) {
    console.log(data);
    
    setTimeout(() => {
      setIsSubmitted(true);
      
      toast({
        title: "応募を受け付けました",
        description: "担当者からのご連絡をお待ちください。",
        duration: 5000,
      });
    }, 1500);
  }

  if (!isMounted) return null;

  return (
    <section
      ref={sectionRef}
      id="応募"
      className="py-24 bg-gradient-to-t from-black to-gray-900 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-40 bg-[linear-gradient(to_bottom,rgba(255,102,153,0.2),transparent)]" />
        <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-mincho font-bold mb-6">
            <span className="text-pink-400">応募フォーム</span>
          </h2>
          <p className="text-lg text-white/80">
            お気軽にご応募ください。専任のスタッフが丁寧にご案内します。
            面接は履歴書不要、私服でお越しください。
          </p>
        </div>

        <div ref={formRef} className="max-w-3xl mx-auto">
          {!isSubmitted ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">お名前</FormLabel>
                          <FormControl>
                            <Input placeholder="山田 花子" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">年齢</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                                <SelectValue placeholder="年齢を選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 63 }, (_, i) => i + 18).map((age) => (
                                <SelectItem key={age} value={age.toString()}>
                                  {age}歳
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">メールアドレス</FormLabel>
                          <FormControl>
                            <Input placeholder="example@mail.com" type="email" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">電話番号</FormLabel>
                          <FormControl>
                            <Input placeholder="090-1234-5678" {...field} className="bg-white/20 border-white/30 text-white placeholder:text-white/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="preferredDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel className="text-white">希望面接日</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    "bg-white/20 border-white/30 text-white",
                                    !field.value && "text-white/50"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP', { locale: ja })
                                  ) : (
                                    <span>日付を選択</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  isBefore(date, today) || isAfter(date, twoMonthsFromNow)
                                }
                                initialFocus
                                locale={ja}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="preferredTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">希望時間帯</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                                <SelectValue placeholder="時間帯を選択" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {['10:00〜12:00', '13:00〜15:00', '15:00〜17:00', '17:00〜19:00', '19:00〜21:00'].map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="workLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">希望勤務形態</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white/20 border-white/30 text-white">
                              <SelectValue placeholder="勤務形態を選択" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {['通勤（店舗勤務）', '在宅ワーク', '両方検討中'].map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">その他ご質問など</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="ご質問や気になることがあればお書きください"
                            className="resize-none bg-white/20 border-white/30 text-white placeholder:text-white/50"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-white/70">
                          不安なことや確認したいことがあれば、お気軽にご記入ください。
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="agreeTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-white">
                            <span>
                              <a href="/terms" className="text-pink-300 hover:text-pink-200 underline underline-offset-4">利用規約</a>
                              と
                              <a href="/privacy" className="text-pink-300 hover:text-pink-200 underline underline-offset-4">プライバシーポリシー</a>
                              に同意します
                            </span>
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={cn(
                      "w-full bg-pink-500 hover:bg-pink-600 text-white py-6 text-lg font-bold",
                      "transition-all duration-300 shadow-[0_0_15px_rgba(255,102,153,0.5)]",
                      "hover:shadow-[0_0_25px_rgba(255,102,153,0.7)]"
                    )}
                  >
                    応募する
                  </Button>
                </form>
              </Form>
            </div>
          ) : (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 shadow-xl text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle2 className="w-16 h-16 text-pink-400" />
              </div>
              <h3 className="text-2xl font-mincho font-bold mb-4">応募が完了しました</h3>
              <p className="text-white/80 mb-6">
                ご応募ありがとうございます。担当者より1営業日以内にご連絡いたします。
                メールもしくはお電話にてご連絡いたしますので、ご確認をお願いいたします。
              </p>
              <div className="bg-white/20 rounded-lg p-4 inline-block">
                <p className="text-pink-300 font-bold">お問い合わせ番号</p>
                <p className="text-xl text-white">
                  {Math.floor(Math.random() * 9000000) + 1000000}
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 text-center text-white/70 text-sm">
            <p>お電話でのご応募・ご質問も受け付けております</p>
            <p className="text-xl font-bold text-white mt-2">080-XXXX-XXXX</p>
            <p className="mt-1">受付時間: 10:00〜22:00（年中無休）</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ApplicationSection() {
  return (
    <ClientAnimationProvider>
      <ApplicationContent />
    </ClientAnimationProvider>
  );
}