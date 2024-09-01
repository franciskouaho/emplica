interface Job {
  name_company: string;
  name_job: string;
  salary_minimum: number | null;
  salary_maximum: number | null;
  city: string;
  profile: string;
  id: string;
  published_at_date: string;
  benefits: string;
  highlight_result: string;
  slug: string;
}

export default Job;
