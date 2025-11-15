import { useEffect, useRef } from 'react';
import 'mathlive';

// Import du type officiel de mathlive
import type { MathfieldElement as MathfieldElementType } from 'mathlive';

// Étend les types JSX de React pour inclure l'élément <math-field>
declare global {
	// eslint-disable-next-line
	namespace JSX {
		interface IntrinsicElements {
			'math-field': React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				ref?: React.Ref<MathfieldElementType>;
				// Tous les attributs possibles de math-field
				'default-mode'?: 'math' | 'text' | 'latex';
				'letter-shape-style'?: string;
				'min-font-scale'?: number;
				'max-matrix-cols'?: number;
				'popover-policy'?: 'auto' | 'off';
				'math-mode-space'?: string;
				'read-only'?: boolean;
				'remove-extraneous-parentheses'?: boolean;
				'smart-fence'?: 'on' | 'off';
				'smart-mode'?: 'on' | 'off';
				'smart-superscript'?: 'on' | 'off';
				'inline-shortcut-timeout'?: string;
				'script-depth'?: string;
				placeholder?: string;
				'math-virtual-keyboard-policy'?:
					| 'auto'
					| 'manual'
					| 'sandboxed';
				'virtual-keyboard-target-origin'?: string;
			};
		}
	}
}

export function MathInput() {
	const mathFieldRef = useRef<MathfieldElementType>(null);

	useEffect(() => {
		if (mathFieldRef.current) {
			window.mathVirtualKeyboard.alphabeticLayout = 'azerty';
			window.mathVirtualKeyboard.layouts = [
				'alphabetic',
				'numeric',
				'greek',
				'symbols',
			];
			mathFieldRef.current.mathVirtualKeyboardPolicy = 'manual';
			mathFieldRef.current.placeholder = 'math field';
			mathFieldRef.current.addEventListener('input', (evt: Event) => {
				const target = evt.target as MathfieldElementType;
				console.log('LaTeX:', target.value);
			});
			mathFieldRef.current.smartMode = true;
			mathFieldRef.current.addEventListener('focusin', () => {
				window.mathVirtualKeyboard.show({ animate: true });
			});
			mathFieldRef.current.addEventListener('focusout', () => {
				window.mathVirtualKeyboard.hide({ animate: true });
			});
		}
	}, []);

	return <math-field ref={mathFieldRef} />;
}
