interface Application {
  id: string;
  position: string;
  companyName: string;
  dateApplied: string;
  salary?: number;
  jobDescription?: string;
  currentStatus: {
    name: string;
    priority: number;
  };
}

export type { Application as default };
