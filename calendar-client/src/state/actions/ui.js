import { types } from '../types/types';

export const openModal = () => ({
    type: types.ui.uiOpenModal
});

export const closeModal = () =>({
    type: types.ui.uiCloseModal
});