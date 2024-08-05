import SignUpForm from "@/components/auth/SignUpForm";
const SignupPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="hidden  lg:block">
        <div className="p-8">
          <h1 className="scroll-m-20 mt-32 xl:mt-48 text-center text-4xl font-extrabold tracking-tight lg:text-4xl">
            Register Now, Unleash Your Thoughts <br /> Without Revealing
            Yourself
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center py-6">
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignupPage;
