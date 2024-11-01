// InputBox.jsx
export const InputBox = ({ label, placeholder, onChange }) => {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input
        type="text" // Specify the input type (you can change it to "password" for the password field)
        placeholder={placeholder}
        className="w-full px-2 py-1 border rounded border-slate-200"
        onChange={onChange} // Bind the onChange event to the passed handler
      />
    </div>
  );
};
