import React from 'react';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';

import Modal from '~/components/Modal';
import { DetailGroup } from './styles';

export default function DeliveryDetails({ visible, toggle, delivery }) {
  return (
    <Modal visible={visible} toggle={toggle}>
      <DetailGroup>
        <div>
          <strong>Informações da encomenda</strong>
          <p>{delivery.recipient.address.full_address}</p>
        </div>
        <div>
          <strong>Datas</strong>
          <span>
            <span>Retirada: </span>
            {delivery.start_date
              ? format(parseISO(delivery.start_date), 'dd/MM/yyyy HH:mm')
              : ''}
          </span>
          <span>
            <span>Entrega: </span>
            {delivery.end_date
              ? format(parseISO(delivery.end_date), 'dd/MM/yyyy HH:mm')
              : ''}
          </span>
          <span>
            <span>Cancelamento: </span>
            {delivery.canceled_at
              ? format(parseISO(delivery.canceled_at), 'dd/MM/yyyy HH:mm')
              : ''}
          </span>
        </div>
        <div>
          <strong>Assinatura do destinatário</strong>
          {delivery.signature && (
            <img src={delivery.signature.url} alt="signature" />
          )}
        </div>
      </DetailGroup>
    </Modal>
  );
}

DeliveryDetails.propTypes = {
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  delivery: PropTypes.oneOfType([PropTypes.object]),
};

DeliveryDetails.defaultProps = {
  delivery: {
    start_date: '',
    end_date: '',
    recipient: {
      address: {
        full_address: '',
      },
    },
    signature: {
      url: '',
    },
  },
};
