import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import api from '~/services/api';

import AvatarPreview from '~/assets/courier_avatar.jpg';

import { Container } from './styles';

export default function AvatarInput({ defaultValue, onChange }) {
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await api.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
    onChange(id);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <img src={preview || AvatarPreview} alt="" />

        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}

AvatarInput.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func.isRequired,
};

AvatarInput.defaultProps = {
  defaultValue: undefined,
};
