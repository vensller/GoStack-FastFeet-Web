import React from 'react';
import PropTypes from 'prop-types';

import Modal from '~/components/Modal';
import { DetailGroup } from './styles';

export default function ProblemDetails({ visible, toggle, problem }) {
  return (
    <Modal visible={visible} toggle={toggle}>
      <DetailGroup>
        <div>
          <strong>Informações do problema</strong>
          <p>{problem.description}</p>
        </div>
      </DetailGroup>
    </Modal>
  );
}

ProblemDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  problem: PropTypes.oneOfType([PropTypes.object]),
};

ProblemDetails.defaultProps = {
  problem: {
    description: '',
  },
};
