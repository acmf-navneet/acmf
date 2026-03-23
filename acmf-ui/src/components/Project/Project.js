import React, { useState } from 'react';

const Project = () => {

  return (
    <div className = "table card tw-mt-4">
      <header className="table-header">
        <h1 className='tw-sr-only'>Sites</h1>
        <div className='toolbar fill tw-items-center tw-gap-4'>
          <div className='tw-flex tw-grow tw-flex-col lg:tw-flex-row lg:tw-items-center'>
            <form className='tw-relative tw-h-9 tw-max-h-9 tw-basis-106 tw-m-0 !tw-basis-0 lg:!tw-basis-106'>
              <label>
                <span className="tw-sr-only"> Search Site</span>
                <input name="Search" type="search" className='tw-pl-[34px]' placeholder='Search sites' />
                <button tabindex="-1" aria-label="Search" className="btn w-4 h-4 btn-icon btn-secondary btn-secondary--standard tw-flex tw-items-center tw-justify-center tw-border-0 tw-p-0 tw-min-w-0 tw-absolute tw-text-gray-dark dark:tw-text-gray-lighter tw-top-0 tw-h-9 tw-w-10 tw-pointer-events-none !tw-bg-transparent" type="submit">
                    <span className="tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="scalable-icon tw-inline !tw-fill-current tw-align-baseline !tw-block tw-align-baseline" role="img" >
                      <title>Search</title><path d="M2.96 6.79a3.83 3.83 0 1 1 7.66 0 3.83 3.83 0 0 1-7.66 0m3.83-5.63a5.63 5.63 0 1 0 3.29 10.2l3.04 3.04a.9.9 0 1 0 1.28-1.28l-3.05-3.04A5.63 5.63 0 0 0 6.8 1.16Z">
                        </path></svg>
                        </span>
                        </button>
                <span className="tw-absolute tw-left-1/2 tw-top-1/2 tw--translate-x-1/2 tw--translate-y-1/2">
                {/* give the search icon here */}
                        </span>
              </label>
            </form>
          </div>
          <div className='tw-flex tw-w-full tw-grow tw-items-center tw-justify-end tw-gap-4 md:tw-w-auto'>
          <div className="dropdown !tw-mt-0" aria-expanded="false" aria-haspopup="listbox">
  <button
    role="button"
    aria-label="Add new site. Open menu"
    aria-haspopup="true"
    data-toggle="true"
    name="Add new site"
    title="Add new site"
    className="btn btn-default btn-primary btn-primary--standard"
    type="button"
  >
    Add new site
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="scalable-icon tw-inline !tw-fill-current tw-align-baseline tw-ml-2 tw-transition-transform tw-duration-100 tw-ease-cubic-bezier"
      style={{ '--icon-width': '0.75rem', '--icon-height': '0.75rem' }}
    >
      <path d="m4 4 3.4 3.4c.3.4.9.4 1.2 0L11.9 4 14 6.2l-5.4 5.6c-.3.3-.9.3-1.2 0L2 6.2z"></path>
    </svg>
  </button>
  <div className="dropdown-inner dropdown-menu tw-w-full tw-shrink-0 md:tw-w-auto !tw-left-auto !tw-right-0">
    <div>
      <ul role="listbox" id="downshift-5-menu">
        <li>
          <button
            className="tw-text-left tw-border-0 tw-bg-transparent tw-inline tw-p-0 menuitem"
            type="button"
            id="downshift-5-item-0"
            role="option"
          >
            Import an existing project
          </button>
        </li>
        <li>
          <button
            className="tw-text-left tw-border-0 tw-bg-transparent tw-inline tw-p-0 menuitem"
            type="button"
            id="downshift-5-item-1"
            role="option"
          >
            Start from a template
          </button>
        </li>
        <li>
          <button
            className="tw-text-left tw-border-0 tw-bg-transparent tw-inline tw-p-0 menuitem"
            type="button"
            id="downshift-5-item-2"
            role="option"
          >
            Deploy manually
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

          </div>
        </div>
      </header>

    </div>
  );
};

export default Project;