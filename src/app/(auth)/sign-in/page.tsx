import LoginForm from "@/components/auth/LoginForm";
const LoginPage = () => {
  return (
    <div className="w-full lg:grid lg:min-h-[500px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="hidden  lg:block">
        <div>
          <h1 className="scroll-m-20 mt-48 text-center text-4xl font-extrabold tracking-tight lg:text-4xl">
            Sign in to continue
            <br /> your secret conversations
          </h1>
        </div>
      </div>
      <div className="flex items-center  justify-center py-12">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
