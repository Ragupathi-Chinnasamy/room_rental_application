import { ApiClient } from "../network/index";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  localStorage.clear();
  const navigator = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formValues = new FormData(event.target);

    const dataString = {
      email: formValues.get("email"),
      password: formValues.get("password"),
    };

    try {
      const result = await ApiClient.post("auth", dataString);

      if (result?.status === 201 || result?.status == 200) {
        alert(result.data?.message);

        localStorage.setItem("userId", result?.data?.data?.id);
        localStorage.setItem("fName", result?.data?.data?.firstName);
        localStorage.setItem("lName", result?.data?.data?.lastName);
        localStorage.setItem("roleId", result?.data?.data?.role.id);
        localStorage.setItem("role", result?.data?.data?.role.role);
        localStorage.setItem("token", result?.data?.data?.token);

        navigator("/dashBoard");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen  font-mono font-semibold">
      <form
        className="bg-gradient-to-r from-teal-400 to-teal-300 shadow-md rounded-2xl px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-2 my-2 space-y-0.5">
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@example.com"
          />
        </div>
        <div className="mx-2 my-2 space-y-0.5">
          <label className="block">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
          />
        </div>
        <div className="text-center mt-5">
          <button
            className="rounded-md border bg-teal-100 hover:cursor-pointer px-3 py-1 text-xs font-semibold shadow-sm active:scale-95 active:bg-teal-200"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
