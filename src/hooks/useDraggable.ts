// originally from: 
// https://phuoc.ng/collection/react-drag-drop/create-a-radial-progress-bar/
// https://github.com/phuocng/react-drag-drop
// MIT License

import React from "react";

export const useDraggable = ({ initialAngle, onDragStart, onDrag }: { initialAngle: number, onDragStart: () => void, onDrag: (angle:number) => void }) => {
    const [node, setNode] = React.useState<HTMLElement>();
    const [angle, setAngle] = React.useState<number>(initialAngle);
    const [{ dx, dy }, setOffset] = React.useState({
        dx: 0,
        dy: 0,
    });

    const ref = React.useCallback((node: HTMLElement) => {
        setNode(node);
    }, []);

    React.useEffect(() => {
        if (!node) {
            return;
        }
        const width = node.getBoundingClientRect().width;
        const containerWidth = node.parentElement?.getBoundingClientRect().width || 0;
        const radius = containerWidth / 2;
        const center = radius - width / 2;
        const radian = (initialAngle + .25) * Math.PI * 2 - Math.PI;
        const dx = center + radius * Math.cos(radian);
        const dy = center + radius * Math.sin(radian);
        setOffset({ dx, dy });
    }, [node]);

    const setFromAngle = React.useCallback((angle: number) => {
        if (!node) {
            return;
        }
        const width = node.getBoundingClientRect().width;
        const containerWidth = node.parentElement?.getBoundingClientRect().width || 0;
        const radius = containerWidth / 2;
        const center = radius - width / 2;
        const radian = (angle + .25) * Math.PI * 2 - Math.PI;
        const dx = center + radius * Math.cos(radian);
        const dy = center + radius * Math.sin(radian);
        setOffset({ dx, dy });
    }, [node]);

    const handleMouseDown = React.useCallback((e: React.MouseEvent) => {
        if (!node) {
            return;
        }
        console.log("onDragStart");
        onDragStart();
        const startPos = {
            x: e.clientX - dx,
            y: e.clientY - dy,
        };

        const width = node.getBoundingClientRect().width;
        const containerWidth = node.parentElement?.getBoundingClientRect().width || 0;
        const radius = containerWidth / 2;
        const center = radius - width / 2;

        const handleMouseMove = (e: MouseEvent) => {
            let dx = e.clientX - startPos.x;
            let dy = e.clientY - startPos.y;

            const centerDistance = Math.sqrt(
                Math.pow(dx - center, 2) + Math.pow(dy - center, 2)
            );
            const sinValue = (dy - center) / centerDistance;
            const cosValue = (dx - center) / centerDistance;
            dx = center + radius * cosValue;
            dy = center + radius * sinValue;

            const radians = Math.atan2(dy - center, dx - center);
            const angle = (radians + Math.PI) / (Math.PI * 2);
            setAngle(angle);

            const progress = ((angle + .25) % 1);

            console.log("call onDrag", progress);
            onDrag((progress + .5) % 1);

            setOffset({ dx, dy });
            updateCursor();
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            resetCursor();
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [node, dx, dy]);

    const handleTouchStart = React.useCallback((e: React.TouchEvent) => {
        if (!node) {
            return;
        }
        const touch = e.touches[0];

        const startPos = {
            x: touch.clientX - dx,
            y: touch.clientY - dy,
        };
        const width = node.getBoundingClientRect().width;
        const containerWidth = node.parentElement?.getBoundingClientRect().width || 0;
        const radius = containerWidth / 2;
        const center = radius - width / 2;

        const handleTouchMove = (e: TouchEvent) => {
            const touch = e.touches[0];
            let dx = touch.clientX - startPos.x;
            let dy = touch.clientY - startPos.y;
            const centerDistance = Math.sqrt(
                Math.pow(dx - center, 2) + Math.pow(dy - center, 2)
            );
            const sinValue = (dy - center) / centerDistance;
            const cosValue = (dx - center) / centerDistance;
            dx = center + radius * cosValue;
            dy = center + radius * sinValue;

            const radians = Math.atan2(dy - center, dx - center);
            const angle = (radians + Math.PI) / (Math.PI * 2);
            setAngle(angle);

            setOffset({ dx, dy });
            updateCursor();
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
            resetCursor();
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    }, [node, dx, dy]);

    const updateCursor = () => {
        document.body.style.cursor = 'move';
        document.body.style.userSelect = 'none';
    };

    const resetCursor = () => {
        document.body.style.removeProperty('cursor');
        document.body.style.removeProperty('user-select');
    };

    React.useEffect(() => {
        if (!node) {
            return;
        }
        node.addEventListener("mousedown", (e: MouseEvent) => handleMouseDown(e as unknown as React.MouseEvent));
        node.addEventListener("touchstart", (e: TouchEvent) => handleTouchStart(e as unknown as React.TouchEvent));
        return () => {
            node.removeEventListener("mousedown", (e: MouseEvent) => handleMouseDown(e as unknown as React.MouseEvent));
            node.removeEventListener("touchstart", (e: TouchEvent) => handleTouchStart(e as unknown as React.TouchEvent));
        };
    }, [node, dx, dy]);

    return [ref, dx, dy, angle, setFromAngle];
};