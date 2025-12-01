"use client";

import Link from "next/link";

export default function MyBackButton({ pageTitle, user = null, onSignOut = null }) {
    return (
        <div className="container ">
            <Link href="/" className="text-2xl font-bold py-4 flex items-center">
                &larr; <span className="text-sm ml-1 font-thin hover:underline">Back</span>
            </Link>
            <hr className="border mb-4" />
            {
                pageTitle && (
                    <>
                        <div className="flex flex-col md:flex-row justify-between">
                            <h2 className="text-xl font-semibold">{pageTitle}</h2>
                            {user && (
                                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                    <p className="text-sm md:text-base">Logged in as <span className="font-semibold">{user.displayName}</span></p>
                                    <button
                                        className="hover:underline underline-offset-2 text-sm md:text-base"
                                        onClick={onSignOut}
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                        <hr className="border mt-4 mb-4" />
                    </>
                )
            }

        </div>

    );
}