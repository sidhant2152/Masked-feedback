import VerifyForm from "@/components/auth/VerifyForm";
const verifyPage = ({ params }: { params: { username: string } }) => {
  return (
    <div className="w-full min-h-[500px] flex justify-center items-center xl:min-h-[600px]">
      <VerifyForm params={params} />
    </div>
  );
};
export default verifyPage;
