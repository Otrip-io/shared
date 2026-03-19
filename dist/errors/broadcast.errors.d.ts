export declare const BROADCAST_ERRORS: {
    readonly NOT_FOUND: {
        readonly code: "BROADCAST_NOT_FOUND";
        readonly message: "Broadcast not found";
    };
    readonly ALREADY_ACTIVE: {
        readonly code: "BROADCAST_ALREADY_ACTIVE";
        readonly message: "Broadcast is already active";
    };
    readonly CANNOT_EDIT: {
        readonly code: "BROADCAST_CANNOT_EDIT";
        readonly message: "Only draft or scheduled broadcasts can be edited";
    };
    readonly CANNOT_DELETE: {
        readonly code: "BROADCAST_CANNOT_DELETE";
        readonly message: "Only draft, expired, or cancelled broadcasts can be deleted";
    };
    readonly CANNOT_ACTIVATE: {
        readonly code: "BROADCAST_CANNOT_ACTIVATE";
        readonly message: "Only draft or scheduled broadcasts can be activated";
    };
    readonly CANNOT_CANCEL: {
        readonly code: "BROADCAST_CANNOT_CANCEL";
        readonly message: "Only active or scheduled broadcasts can be cancelled";
    };
    readonly ALREADY_DISMISSED: {
        readonly code: "BROADCAST_ALREADY_DISMISSED";
        readonly message: "Broadcast already dismissed";
    };
    readonly NOT_DISMISSIBLE: {
        readonly code: "BROADCAST_NOT_DISMISSIBLE";
        readonly message: "This broadcast cannot be dismissed";
    };
    readonly TEMPLATE_NOT_FOUND: {
        readonly code: "BROADCAST_TEMPLATE_NOT_FOUND";
        readonly message: "Broadcast template not found";
    };
    readonly VARIANT_GROUP_INCOMPLETE: {
        readonly code: "BROADCAST_VARIANT_GROUP_INCOMPLETE";
        readonly message: "A/B test requires both variant A and B";
    };
    readonly VARIANT_GROUP_EXISTS: {
        readonly code: "BROADCAST_VARIANT_GROUP_EXISTS";
        readonly message: "A variant with this group already exists for this variant letter";
    };
};
