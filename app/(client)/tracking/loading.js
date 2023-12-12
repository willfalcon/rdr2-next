import Title from '@/components/Title';

export default function Loading() {
  return (
    <>
      <div>
        <div
          className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ml-4"
          style={{ outline: 'none' }}
        >
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Manage
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm">
            Weapons
          </button>
        </div>
        <div className="mb-3">
          <div className="border-b">
            <h3 className="flex">
              <button className="flex flex-1 items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 px-4">
                <span className="h-5 w-52 bg-neutral-300 rounded" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 transition-transform duration-200"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </h3>
          </div>
          <div className="border-b">
            <h3 className="flex">
              <button className="flex flex-1 items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 px-4">
                <span className="h-5 w-52 bg-neutral-300 rounded" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 transition-transform duration-200"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </h3>
          </div>
          <div className="border-b">
            <h3 className="flex">
              <button className="flex flex-1 items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 px-4">
                <span className="h-5 w-52 bg-neutral-300 rounded" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 transition-transform duration-200"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
            </h3>
          </div>
        </div>
      </div>

      <Title>Items</Title>

      <div className="mb-3">
        <div className="border-b">
          <h3 className="flex">
            <button className="flex flex-1 items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 px-4">
              <span className="h-5 w-52 bg-neutral-300 rounded" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 transition-transform duration-200"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </h3>
        </div>
        <div className="border-b">
          <h3 className="flex">
            <button className="flex flex-1 items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 px-4">
              <span className="h-5 w-52 bg-neutral-300 rounded" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 transition-transform duration-200"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </h3>
        </div>
        <div className="border-b">
          <h3 className="flex">
            <button className="flex flex-1 items-center justify-between p-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180 px-4">
              <span className="h-5 w-52 bg-neutral-300 rounded" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0 transition-transform duration-200"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </button>
          </h3>
        </div>
      </div>
    </>
  );
}
