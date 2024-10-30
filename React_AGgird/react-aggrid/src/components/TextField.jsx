const TextField = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-2 mr-2 border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none"
  />
);

export default TextField;