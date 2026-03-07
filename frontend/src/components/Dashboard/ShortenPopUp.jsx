import React from 'react';
import { Modal } from '../ui';
import CreateNewShorten from './CreateNewShorten';

const ShortenPopUp = ({ open, setOpen, refetch }) => {
  return (
    <Modal
      isOpen={open}
      onClose={() => setOpen(false)}
      title="Create New Short URL"
      size="sm"
    >
      <CreateNewShorten setOpen={setOpen} refetch={refetch} />
    </Modal>
  );
};

export default ShortenPopUp;
