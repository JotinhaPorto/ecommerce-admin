export const useOrigin = () => {
    const origin =  window.location.origin ? window.location.origin : '';

    return origin
}