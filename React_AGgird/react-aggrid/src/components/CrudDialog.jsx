import PropTypes from 'prop-types';

const CrudDialog = ({ title, footer=null, children, onClose, width=500, ...props }) => {
  return (
    <div id="modal-overlay" className='bg-black/50 absolute z-[99] w-screen h-screen'>
      <div
        id="modal"
        className="absolute z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 px-4 rounded-lg divide-y-2 divide-gray-200 flex flex-col" style={{ width }}
      >
        <header className="flex items-center justify-between">
          {typeof title === "string" ? (
            <div className="py-2 text-2xl font-bold">{title}</div>
          ) : (
            title
          )}
          <div
            id="close-btn"
            className="text-3xl font-semibold leading-4 font-mono align-middle text-center text-gray-800 hover:bg-white rounded-lg p-1.5 cursor-pointer"
            onClick={() => onClose()}
          >
            &times;
          </div>
        </header>
        <main className="py-3">{children}</main>
        {footer !== null && <footer>{footer}</footer>}
      </div>
    </div>
  );
}

CrudDialog.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.node,
  children: PropTypes.node.isRequired,
  width: PropTypes.number,
  onClose: PropTypes.func,
};

export default CrudDialog;