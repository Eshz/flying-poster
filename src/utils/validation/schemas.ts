
import { z } from 'zod';

export const posterImageSchema = z.object({
  url: z.string().url(),
  visible: z.boolean(),
  caption: z.string(),
  upperCaption: z.string().optional(),
});

export const posterDataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authors: z.string().min(1, 'Authors are required'),
  school: z.string().min(1, 'School/Institution is required'),
  contact: z.string().email('Valid email is required'),
  introduction: z.string(),
  methods: z.string(),
  findings: z.string(),
  conclusions: z.string(),
  references: z.string(),
  keypoints: z.array(z.string()),
  keyDescriptions: z.array(z.string()),
  keyVisibility: z.array(z.boolean()).optional(),
  sectionTitles: z.array(z.string()),
  qrCodeUrl: z.string().url().optional().or(z.literal('')),
  qrCodeColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  qrCodeCaption: z.string().optional(),
  showKeypoints: z.boolean(),
  showQrCode: z.boolean(),
  images: z.array(posterImageSchema),
});

export const designSettingsSchema = z.object({
  layout: z.enum(['classic', 'modern', 'focus']),
  titleFont: z.enum(['playfair', 'roboto', 'merriweather', 'montserrat', 'opensans', 'lora', 'raleway']),
  contentFont: z.enum(['playfair', 'roboto', 'merriweather', 'montserrat', 'opensans', 'lora', 'raleway']),
  headerBgColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  headerTextColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  sectionBgColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  sectionTitleColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  sectionTextColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  keyPointsBgColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
  keyPointsTextColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
});

export const projectDataSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1, 'Project name is required'),
  createdAt: z.number(),
  updatedAt: z.number(),
  posterData: posterDataSchema,
  designSettings: designSettingsSchema,
  qrColor: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid hex color'),
});
