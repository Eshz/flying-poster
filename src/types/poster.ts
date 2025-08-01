
export interface PosterImage {
  url: string;
  visible: boolean;
  caption: string;
  upperCaption?: string;
}

export interface PosterData {
  title: string;
  authors: string;
  school: string;
  contact: string;
  introduction: string;
  methods: string;
  findings: string;
  conclusions: string;
  references: string;
  keypoints: string[];
  keyDescriptions: string[];
  keyVisibility?: boolean[];
  sectionTitles: string[];
  qrCodeUrl: string;
  qrCodeColor: string;
  qrCodeCaption?: string;
  showKeypoints: boolean;
  showQrCode: boolean;
  images: PosterImage[];
}
