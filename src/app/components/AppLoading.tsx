import { LoaderIcon } from 'lucide-react';
export default function AppLoading() {
    return (
        <div className='flex items-center justify-center mt-20'>
            <LoaderIcon size={40} className='animate-spin' />
        </div>
    );
}