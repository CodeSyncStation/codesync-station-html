import image from "@/assets/images/authentications/jose-vazquez-Q5RBHz9cu1A-unsplash.jpg";
import logo from "@/assets/images/CS LOGO 1-05.png";
import { auth } from "@/auth";
import AuthenticationForm from "@/Components/form/AuthenticationForm";
import Image from "next/image";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Login || CodeSync station",
  description: "",
}

export default async function LoginPage() {
  const session = await auth()
  if (session?.user) {
    redirect("/")
  }
  return (
    <div className="authentication">
      <div className="row h-100 g-0 m-0  p-0  ">
        <div className="col-lg-6 d-none  d-lg-block ">
          <div className="left-part">
            <Image src={image} alt=" not fo" />
          </div>
        </div>
        <div className="col-12 col-lg-6 p-0 ">
          <div className="login-right">
            <div className="login-wrapper">
              <figure className="logo-wrapper">
                <Image
                  src={logo}
                  alt="logo"
                  height={52}
                  width={146}
                />
              </figure>
              <AuthenticationForm />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
