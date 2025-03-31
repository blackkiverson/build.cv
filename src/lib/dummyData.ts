export const dummyProfile = {
 name: 'Samuel OI',
 headline: 'Product Designer, Frontend Developer',
 bio: "Hi there! I'm a software developer passionate about building great user experiences.",
 status: 'Currently searching for that first break through...',
 statusDate: '2 months ago',
 avatar:
  'https://res.cloudinary.com/read-cv/image/upload/c_fill,h_92,w_92/dpr_1.0/v1/1/profilePhotos/RnFsBfdJwnfjICisakRJyi9hebr2/d65260ce-a90f-4a9a-935d-81fd859b9e85.jpg?_a=DATAdtAAZAA0',
 lastEdited: new Date().toISOString(),
};

export const dummyProjects = [
 {
  id: '1',
  title: 'Personal Portfolio',
  description:
   'A responsive portfolio website built with React and TailwindCSS to showcase my work and skills.',
  imageUrl:
   'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  imageUrls: [
   'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  tags: ['React', 'TailwindCSS', 'JavaScript'],
  liveUrl: 'https://example.com',
  githubUrl: 'https://github.com/example/portfolio',
  featured: true,
 },
 {
  id: '2',
  title: 'E-commerce Dashboard',
  description:
   'An admin dashboard for managing products, orders, and customers for an e-commerce platform.\nA responsive portfolio website built with React and TailwindCSS to showcase my work and skills. A responsive portfolio website built with React and TailwindCSS to showcase my work and skills.',
  imageUrl:
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  imageUrls: [
   'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
   'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ],
  tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
  liveUrl: '',
  githubUrl: 'https://github.com/example/ecommerce-dashboard',
  featured: false,
 },
 {
  id: '3',
  title: 'Weather App',
  description:
   'A simple weather application that displays current weather and forecasts based on location.',
  imageUrl:
   '',
  imageUrls: [],
  tags: ['JavaScript', 'API Integration', 'CSS'],
  liveUrl: 'https://weather-app-example.vercel.app',
  githubUrl: 'https://github.com/example/weather-app',
  featured: false,
 },
];