export interface Testimonial {
    username: string
    stars: number
    testimonial: string
}

export const testimonials = [
    {
      username: 'David Chen',
      stars: 5,
      testimonial:
        'Their 3D modeling precision is outstanding. Every detail in our custom toy designs was perfectly executed, maintaining both aesthetic appeal and manufacturing feasibility.',
    },
    {
      username: 'Sarah Williams',
      stars: 5,
      testimonial:
        'Exceptional engineering standards. Their technical documentation and material selection process shows deep understanding of toy manufacturing requirements.',
    },
    {
      username: 'Mike Rodriguez',
      stars: 4,
      testimonial:
        'Reliable delivery schedules and excellent packaging solutions. Their inventory management system seamlessly integrated with our supply chain.',
    },
    {
      username: 'Lisa Zhang',
      stars: 5,
      testimonial:
        'Top-notch production quality control. Their attention to manufacturing tolerances and material consistency is impressive. Zero defects in our last batch.',
    },
  ]