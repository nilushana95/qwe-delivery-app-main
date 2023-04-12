import React, { FC, ReactNode } from 'react';
import { Modal } from 'antd';

export type CustomModalProps = {
    visible: boolean;
    onClose: (val?: any) => void;
    title: string;
    children: ReactNode;
    width?: number | string;
    color?: string;
    footer?: React.ReactNode;
};
const CustomModal: FC<CustomModalProps> = (props) => {
    const { title, visible, onClose, children, width, color } = props;
    return (
        <>
            <Modal
                title={title}
                centered
                bodyStyle={{ overflowY: 'auto', maxHeight: 'calc(100vh - 100px)', overflowX: 'hidden', backgroundColor:`${color}`}}
                visible={visible}
                onCancel={() => onClose('add')}
                width={width ?? '50%'}
                footer={props.footer}>
                {children}
            </Modal>
        </>
    );
};
export default CustomModal;
