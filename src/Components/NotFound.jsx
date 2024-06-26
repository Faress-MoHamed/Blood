function NotFound() {
  return (
		<section class="bg-white ">
			<div class="container flex items-center min-h-screen px-6 py-12 mx-auto">
				<div>
					<p class="text-sm font-medium text-primary-500 ">
						404 error
					</p>
					<h1 class="mt-3 text-2xl font-semibold text-gray-800  md:text-3xl">
						We can’t find that page
					</h1>
					<p class="mt-4 text-gray-500 dark:text-gray-400">
						Sorry, the page you are looking for doesn't exist or has been moved.
					</p>
				</div>
			</div>
		</section>
	);
}

export default NotFound
