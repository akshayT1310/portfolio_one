import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required').max(80),
  email: z.string().trim().email('Please enter a valid email address'),
  phone: z.string().trim().min(8, 'Please enter a valid phone number').max(20).regex(/^\+?[\d\s-]{7,15}$/, 'Please enter a valid phone number'),
  subject: z.string().trim().min(3, 'Subject is required').max(120),
  message: z.string().trim().min(10, 'Message should be at least 10 characters').max(2000)
});

export function sanitizeText(value: string) {
  return value.replace(/[<>]/g, '').trim();
}
