type Color = 'red' | 'indigo'

const classes = 'rounded-full p-1 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
    .split(' ')
;

const colorClasses: Record<Color, Array<string>> = {
    'indigo': 'bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600'.split(' '),
    'red': 'bg-red-600 hover:bg-red-500 focus-visible:outline-red-600'.split(' '),
}

const getTailwindClasses = (color: Color): Array<string> =>
    [...classes, ...colorClasses[color]]
;

export const CircularButton = {getTailwindClasses}
