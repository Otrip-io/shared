"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BROADCAST_ERRORS = void 0;
exports.BROADCAST_ERRORS = {
    NOT_FOUND: { code: 'BROADCAST_NOT_FOUND', message: 'Broadcast not found' },
    ALREADY_ACTIVE: { code: 'BROADCAST_ALREADY_ACTIVE', message: 'Broadcast is already active' },
    CANNOT_EDIT: { code: 'BROADCAST_CANNOT_EDIT', message: 'Only draft or scheduled broadcasts can be edited' },
    CANNOT_DELETE: { code: 'BROADCAST_CANNOT_DELETE', message: 'Only draft, expired, or cancelled broadcasts can be deleted' },
    CANNOT_ACTIVATE: { code: 'BROADCAST_CANNOT_ACTIVATE', message: 'Only draft or scheduled broadcasts can be activated' },
    CANNOT_CANCEL: { code: 'BROADCAST_CANNOT_CANCEL', message: 'Only active or scheduled broadcasts can be cancelled' },
    ALREADY_DISMISSED: { code: 'BROADCAST_ALREADY_DISMISSED', message: 'Broadcast already dismissed' },
    NOT_DISMISSIBLE: { code: 'BROADCAST_NOT_DISMISSIBLE', message: 'This broadcast cannot be dismissed' },
};
