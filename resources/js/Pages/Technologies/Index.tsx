import * as React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import { PageProps, User } from '@/types';
import { Paginator } from '@/Components/Table/Paginator';
import { PencilSquareIcon } from '@heroicons/react/24/solid'

interface Technology {
    id: string;
    name: string;
    description: string;
    icons: string[];
    created_at: string | null;
    updated_at: string | null;
}

type Pagination = { data: Technology[], meta: { per_page: number, current_page: number, last_page: number, total: number } }
type QueryParams = { page: number, search: string, limit: string }

const defaultParams: QueryParams = { page: 1, search: "", limit: "10" }

export default function Technologies({ auth, techs, queryParams = null, success }: { auth: { user: User }, techs: Pagination, queryParams: null | QueryParams, success: string }) {

    const { data, meta } = techs as Pagination;
    const currentParams: QueryParams = Object.assign({}, defaultParams, queryParams);
    const [search, setSearch] = React.useState<string>("");

    function changePage(page: number) {
        currentParams["page"] = page;
        router.get("technologies", currentParams);
    }

    function submitSearch(e: any) {
        if (e.key === 'Enter') {
            currentParams["search"] = search;
            router.get("technologies", currentParams);
        }
    }

    function getIconCdn(icon: string) {
        return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${icon}.svg`;
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Technologies</h2>}
        >
            <Head title="Technologies" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {success &&
                        <div className="my-2 bg-teal-500 text-sm text-white rounded-lg p-4" role="alert">
                            <span className="font-bold">Success!</span> {success as string}
                        </div>
                    }

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">

                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="border rounded-lg divide-y divide-gray-200">

                                        <div className="flex justify-between py-3 px-4">
                                            <div className="relative max-w-xs">
                                                <label className="sr-only">Search</label>
                                                <input
                                                    type="text"
                                                    name="hs-table-with-pagination-search"
                                                    id="hs-table-with-pagination-search"
                                                    className="py-2 ps-3 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-red-500 focus:ring-red-500 disabled:opacity-50 disabled:pointer-events-none"
                                                    placeholder="Search for items"
                                                    onKeyDown={submitSearch} onChange={(e) => setSearch(e.target.value)}
                                                />
                                            </div>
                                            <div>
                                                <Link href={route('technologies.create')} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                                                    Create Tech
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-neutral-900">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase">Icons</th>
                                                        <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-white uppercase">Description</th>
                                                        <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-white uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200">

                                                    {data.map((tech) => (
                                                        <tr key={tech.id}>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{tech.name}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                                <div className="flex gap-1">
                                                                    {tech.icons.map((icon: string) =>
                                                                        <img src={getIconCdn(icon)} className="h-8 w-8" alt={`${icon} icon`} key={icon} />
                                                                    )}
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{tech.description}</td>
                                                            <td className="px-6 py-4 flex justify-end whitespace-nowrap text-sm font-medium">
                                                                <Link href={route('technologies.edit', { id: tech.id })}>
                                                                    <PencilSquareIcon className="flex-shrink-0 w-5 h-5 text-green-600 transition duration-75" />
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    ))}

                                                    {data.length === 0 &&
                                                        <tr>
                                                            <td colSpan={5} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">No technology found</td>
                                                        </tr>
                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                        <Paginator last_page={meta.last_page} current_page={meta.current_page} changePage={changePage} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}