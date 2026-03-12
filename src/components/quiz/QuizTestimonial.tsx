interface QuizTestimonialProps {
  quote: string;
  name: string;
}

const QuizTestimonial = ({ quote, name }: QuizTestimonialProps) => {
  return (
    <div className="quiz-testimonial mb-6">
      <p className="text-sm md:text-base mb-2">"{quote}"</p>
      <p className="font-bold text-xs not-italic">{name}, Verified Customer</p>
    </div>
  );
};

export default QuizTestimonial;
