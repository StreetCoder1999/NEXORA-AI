import "./signUpPage.css";
const SignUpPage = () => {
  return (
    <div className="signUpPage">
      <SignUp
        path="/sign-up"
        signUpUrl="/sign-up"
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
};

export default SignUpPage;