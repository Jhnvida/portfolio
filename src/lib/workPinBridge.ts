export interface WorkPinHandlers {
    onEnter: () => void;
    onLeave: () => void;
    onEnterBack: () => void;
    onLeaveBack: () => void;
    onPinSetupDone: (pinCreated: boolean) => void;
}

let _handlers: WorkPinHandlers | null = null;
let _lastPinState: boolean | null = null;

export function registerWorkPinHandlers(handlers: WorkPinHandlers): () => void {
    _handlers = handlers;

    if (_lastPinState !== null) {
        handlers.onPinSetupDone(_lastPinState);
    }

    return () => {
        if (_handlers === handlers) {
            _handlers = null;
        }
    };
}

export function setWorkPinState(pinCreated: boolean): () => void {
    _lastPinState = pinCreated;
    _handlers?.onPinSetupDone(pinCreated);

    return () => {
        if (_lastPinState === pinCreated) {
            _lastPinState = null;
        }
    };
}

export const workPinProxy = {
    onEnter: () => _handlers?.onEnter(),
    onLeave: () => _handlers?.onLeave(),
    onEnterBack: () => _handlers?.onEnterBack(),
    onLeaveBack: () => _handlers?.onLeaveBack(),
};

export function getWorkPinHandlers(): typeof workPinProxy {
    return workPinProxy;
}
