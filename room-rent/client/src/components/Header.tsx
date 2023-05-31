export const Header = () => {
  const userName = `${localStorage.getItem("fName")} ${localStorage.getItem(
    "lName"
  )} `;
  return (
    <div className="flex justify-between min-w-full border">
      <div className="px-5">
        <h3>Room-rental-Service</h3>
      </div>
      <div className="px-5">
        <h3 className="">
          Hey..!
          <span className="font-sans text-green-900">{userName}</span>
        </h3>
      </div>
    </div>
  );
};
