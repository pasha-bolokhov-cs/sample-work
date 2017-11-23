#
# "GraphAjax" Perl Module
# Author: Pasha Bolokhov <pasha.bolokhov@gmail.com>
#
# The following POST parameters are expected:
#
# 	chart = <see $requests_table below>
# 	range = 'year' | 'all'		(optional, default is 'year')
# 	period = <number of days>	(number of days to average over)
#

package _________::Controller::GraphAjax;

use JSON;
use Scalar::Util qw(looks_like_number);
use DateTime;
use base _________::Core;

# *******s ID
use constant @@@@@@@_ID_*** => 45;
use constant @@@@@@@_ID_*** => 49;
use constant @@@@@@@_ID_*** => 58;

# Define what is too much for Javascript to handle
use constant LIMIT_OF_RECORDS => 4000;

# Period of averaging in days
use constant MAX_REASONABLE_AVERAGING_PERIOD => 100000;

# Maximum length of the chart name, for validation purposes
use constant MAX_REASONABLE_CHART_NAME_LENGTH => 100;

# Maximum length of the @@@@@@@ name, for validation purposes
use constant MAX_REASONABLE_@@@@@@@_NAME_LENGTH => 100;


# Table of requests
my $requests_table = {
	"########s"	=> \&fetch_########s,
	"%%%%%%"	=> \&fetch_%%%%%%,
	"****_%%%%%%"	=> \&fetch_****_%%%%%%,
	"####"		=> \&fetch_####,
	"%%%%%"		=> \&fetch_%%%%%
};


sub process {
	my ($self, $params) = @_;
	my $response = {};

	##
	## Find the appropriate handler based on 'chart' parameter
	##
	if (!CGI::param('chart')) {
		$response->{error} = "chart not specified";
		goto out;
	}
	my $request = CGI::param('chart');
	if (length($request) > MAX_REASONABLE_CHART_NAME_LENGTH ||
	    $request =~ /[^[:alnum:]_]/) {				# check that $request is alphanumeric
		$response->{error} = "Invalid chart name `$request'";
		goto out;
	}
	if (!exists $requests_table->{$request}) {
		$response->{error} = "chart not recognized";
		goto out;
	}

	##
	## Perform parameter validation
	##
	my $recent_year = 1;			# default to the recent year
	my $period;
	
	#
	# Obtain the date range
	#
	if (CGI::param('range')) {
		my $range = CGI::param('range');
		if ($range eq 'all') {
			$recent_year = 0;
		} elsif ($range eq 'year') {
			$recent_year = 1;
		} else {
			$response->{error} = "Invalid date range";
			goto out;
		}
	}


	#
	# Calculate the start of the date range if needed
	#
	my $year_ago;
	if ($recent_year) {
		my $year_ago_date = DateTime->today;
		$year_ago_date->subtract(years => 1);
		$year_ago = $year_ago_date->ymd;
	}


	#
	# Obtain the averaging period
	#
	if (CGI::param('period')) {
		$period = CGI::param('period');
	} else {
		$response->{error} = "Averaging period not supplied";
		goto out;
	}
	if (!looks_like_number($period) ||
	    $period < 0 || $period > MAX_REASONABLE_AVERAGING_PERIOD) {
		$response->{error} = "Invalid averaging period";
		goto out;
	}

	##
	## Call the handler
	##
	$requests_table->{$request}->($self, $year_ago, $period, $response);

out:
	##
	## Convert to Json and pass the results over
	##
	$self->{stash}->{json} = encode_json($response);


	##
	## Specify the template file
	##
	$self->{template} = "tmpl/json.tmpl";
	$self->{content_type} = "application/json";

	return 1;
}


#
# Average a date-ordered array
#
sub average_array {
	my ($self, $array, $period, $params) = @_;
	my $averaged = [];

	# Push in all the rows
	my $parser = $self->{schema}->storage->datetime_parser;
	my $date, $aver_begin_date;
	my $row;
	for ($averaging = 0, $curr_count = 0, $r = 0;
	     $r <= $#$array && ($row = $array->[$r]);
	     $averaging += $curr_count,
	     $r++) {
		$curr_count = $row->{number};

		# build the current date
		$date = DateTime->new(
			year	=> $row->{year},
			month	=> $row->{month},
			day	=> $row->{day}
		);

		# accumulate the average
		if ($averaging == 0) {		# the very first iteration of the loop
			$aver_begin_date = $date->clone();
			next;
		}

		# are we enough days past to push out the sum?
		my $time_diff = $date->delta_days($aver_begin_date)->in_units('days');
		if ($time_diff >= $period || $r == $#$array) {
			#
			# add the current cycle's value
			# if we are on the last row - or it will be lost,
			# since there will be no next iteration of the loop
			# where the current count would normally go
			#
			if ($r == $#$array) {
				$averaging += $curr_count;
				$averaging /= $time_diff;
			} else {
				$averaging /= $period;
			}

			#
			# push out the sum - set x-axis time
			# to the middle of the interval we are averaging over
			#
			$aver_begin_date->add(days => $time_diff / 2);
			push(@{$averaged}, {
				year => $aver_begin_date->year(),
				month => $aver_begin_date->month(),
				day => $aver_begin_date->day(),
				number => 0.0 + $averaging		# so Perl stores it as a number
			});

			# reset averaging
			$averaging = 0;
			$aver_begin_date = $date->clone();
		}
	}

	return $averaged;
}


#
# Handle the request for the graph of ########s
#
sub fetch_########s {
	my ($self, $year_ago, $averaging_period, $response) = @_;

	##
	## Check if '@@@@@@@' was specified
	##
	my $@@@@@@@;
	my $@@@@@@@_id_where_clauses = {
		"***"	=>	@@@@@@@_ID_***,
		"***"	=>	@@@@@@@_ID_***,
		"***"	=>	@@@@@@@_ID_***,
		"all"	=>	[ @@@@@@@_ID_***, @@@@@@@_ID_***, @@@@@@@_ID_*** ]
	};
	if (!CGI::param('@@@@@@@')) {
		$response->{error} = "******* not supplied";
		goto out;
	}
	$@@@@@@@ = CGI::param('@@@@@@@');
	if (length($@@@@@@@) > MAX_REASONABLE_@@@@@@@_NAME_LENGTH ||
	    $@@@@@@@ =~ /[^[:alnum:]_]/) {				# check that $@@@@@@@ is alphanumeric
		$response->{error} = "Invalid @@@@@@@ name";
		goto out;
	}
	if (!exists $@@@@@@@_id_where_clauses->{$@@@@@@@}) {
		$response->{error} = "******* not recognized";
		goto out;
	}
	

	##
	## Get the grouped ########s data
	## SELECT DATE(_________) AS the_date, COUNT(*) AS Count FROM ?????_########s
	##        WHERE ########ed > 0 GROUP BY the_date ORDER BY the_date ASC;
	## or
	## SELECT DATE(_________) AS the_date, COUNT(*) AS Count FROM ?????_########s
	##        WHERE ########ed > 0 AND _________ > $year_ago GROUP BY the_date ORDER BY the_date ASC;
	##
	## or even
	##        WHERE '@@@@@@@_id' = $@@@@@@@_id ...
	my $where_clause =  { ########ed => { '>', 0 } };
	my $joins = { map_subscriber => 'map_icountry' };
	if ($year_ago) {
		$where_clause->{_________} = { '>', $year_ago };
	}
	# 'where' clause for '@@@@@@@_id'
	$where_clause->{@@@@@@@_id} = $@@@@@@@_id_where_clauses->{$@@@@@@@};
	# 'where' clause for region
	$where_clause->{'map_icountry.geogroup_id'} = { -not_in => [3,4]};
	# do the search
	my $rs = $self->{schema}->resultset('?????########')->search(
		$where_clause,
		{
			select => [
				{ DATE => '_________', -as => 'the_date' },
				{ count => '*' }
			],
			as => [qw/the_date Count/],
			group_by => [qw/the_date/],
			order_by => { -asc => 'the_date' },
			join => $joins
		}
	);

	# Check if there are points
	if ($rs->count() <= 0) {
		$response->{error} = "No data found for ########s";
		goto out;
	}

	# Check if too many points
	if ($rs->count() > LIMIT_OF_RECORDS) {
		$response->{error} = "Too many data entries: " . $rs->count() .
				     " (limit " . LIMIT_OF_RECORDS . ")";
		goto out;
	}


	##
	## Parse and store the dates
	##
	
	# Push in all the rows
	my $########s = [];
	my $parser = $self->{schema}->storage->datetime_parser;
	my $next_row;
	for (my $row = $rs->next;
	     $next_row = $rs->next, $row;
	     $row = $next_row) {
		# extract the current date
		my $date = $parser->parse_date($row->get_column('the_date'));
		push(@{$########s}, {
			year => $date->year(),
			month => $date->month(),
			day => $date->day(),
			number => 0.0 + $row->get_column('Count')		# so Perl stores it as a number
		});
	}

	my $aver_########s = $self->average_array($########s, $averaging_period);

	##
	## Fill in the response
	##
	$response->{########s} = $########s;
	$response->{aver_########s} = $aver_########s;

out:
	return;
}


#
# Handle the request for the graph of %%%%%%
#
sub fetch_%%%%%%()
{
	my ($self, $year_ago, $averaging_period, $response) = @_;

	my $qtype;
	$qtype = CGI::param('qtype');

	##
	## Get the grouped %%%%%% data
	## SELECT DATE(start_date) AS the_date, COUNT(*) AS Count FROM ?????_%%%%%%
	##        GROUP BY the_date ORDER BY the_date ASC;
	## or
	## SELECT DATE(start_date) AS the_date, COUNT(*) AS Count FROM ?????_%%%%%%
	##        WHERE start_date > $year_ago GROUP BY the_date ORDER BY the_date ASC;
	my $joins = { map_subscriber => 'map_icountry' };
	my $where_clause = $year_ago ?
		{ ********* => { -in => [ 0, 1 ] }, start_date => { '>', $year_ago } } :
		{ ********* => { -in => [ 0, 1 ] } };
	# 'where' clause for ########
	if ($qtype eq '___') {
	    $where_clause->{r$$$$$$$_id} = { '!=', undef };
	}
	$where_clause->{no_stat} = 0;
	# 'where' clause for region
	$where_clause->{'map_icountry.geogroup_id'} = { -not_in => [3,4]};
	my $rs = $self->{schema}->resultset('?????%%%%%%')->search(
		$where_clause,
		{
			select => [
				{ DATE => 'start_date', -as => 'the_date' },
				{ count => '*' }
			],
			as => [qw/the_date Count/],
			group_by => [qw/the_date/],
			order_by => { -asc => 'the_date' },
			join => $joins
		}
	);

	# Check if there are points
	if ($rs->count() <= 0) {
		$response->{error} = "No data found for %%%%%%";
		goto out;
	}

	# Check if too many points
	if ($rs->count() > LIMIT_OF_RECORDS) {
		$response->{error} = "Too many data entries: " . $rs->count() .
				     " (limit " . LIMIT_OF_RECORDS . ")";
		goto out;
	}

	##
	## Parse and store the dates
	##
	
	# Push in all the rows
	my $%%%%%% = [];
	my $parser = $self->{schema}->storage->datetime_parser;
	my $next_row;
	for (my $row = $rs->next;
	     $next_row = $rs->next, $row;
	     $row = $next_row) {
		# extract the current date
		my $date = $parser->parse_date($row->get_column('the_date'));
		push(@{$%%%%%%}, {
			year => $date->year(),
			month => $date->month(),
			day => $date->day(),
			number => 0.0 + $row->get_column('Count')		# so Perl stores it as a number
		});
	}

	my $aver_%%%%%% = $self->average_array($%%%%%%, $averaging_period);


	##
	## Fill in the response
	##
	$response->{%%%%%%} = $%%%%%%;
	$response->{aver_%%%%%%} = $aver_%%%%%%;

out:
	return;
}


#
# Handle the request for the graph of **** %%%%%%
#
sub fetch_****_%%%%%% {
	my ($self, $year_ago, $averaging_period, $response) = @_;

	my $qtype;
	$qtype = CGI::param('qtype');

	##
	## Get the grouped **** %%%%%% data
	## SELECT DATE(start_date) AS the_date, COUNT(*) AS Count FROM ?????_%%%%%%
	##        WHERE ******_id > 0 GROUP BY the_date ORDER BY the_date ASC;
	## or
	## SELECT DATE(start_date) AS the_date, COUNT(*) AS Count FROM ?????_%%%%%%
	##        WHERE ******_id > 0 AND start_date > $year_ago GROUP BY the_date ORDER BY the_date ASC;
	my $where_clause = $year_ago ?
		{ ******_id => { '>' => 0 }, start_date => { '>', $year_ago } } :
		{ ******_id => { '>' => 0 } };
	# 'where' clause for ########
	if ($qtype eq '___') {
	    $where_clause->{r$$$$$$$_id} = { '!=', undef };
	}
	$where_clause->{no_stat} = 0;
	$rs = $self->{schema}->resultset('?????%%%%%%')->search(
		$where_clause,
		{
			select => [
				{ DATE => 'start_date', -as => 'the_date' },
				{ count => '*' }
			],
			as => [qw/the_date Count/],
			group_by => [qw/the_date/],
			order_by => { -asc => 'the_date' }
		}
	);

	# Check if there are points
	if ($rs->count() <= 0) {
		$response->{error} = "No data found for **** %%%%%%";
		goto out;
	}

	# Check if too many points
	if ($rs->count() > LIMIT_OF_RECORDS) {
		$response->{error} = "Too many data entries: " . $rs->count() .
				     " (limit " . LIMIT_OF_RECORDS . ")";
		goto out;
	}

	##
	## Parse and store the dates
	##
	
	# Push in all the rows
	my $****_%%%%%% = [];
	my $parser = $self->{schema}->storage->datetime_parser;
	my $next_row;
	for (my $row = $rs->next;
	     $next_row = $rs->next, $row;
	     $row = $next_row) {
		# extract the current date
		my $date = $parser->parse_date($row->get_column('the_date'));
		push(@{$****_%%%%%%}, {
			year => $date->year(),
			month => $date->month(),
			day => $date->day(),
			number => 0.0 + $row->get_column('Count')		# so Perl stores it as a number
		});
	}

	my $aver_****_%%%%%% = $self->average_array($****_%%%%%%, $averaging_period);


	##
	## Fill in the response
	##
	$response->{****_%%%%%%} = $****_%%%%%%;
	$response->{aver_****_%%%%%%} = $aver_****_%%%%%%;

out:
	return;
}


#
# Handle the request for the graph of trials
#
sub fetch_#### {
	my ($self, $year_ago, $averaging_period, $response) = @_;

	##
	my $where_clause =  { };
	if ($year_ago) {
		$where_clause->{stat_date} = { '>', $year_ago };
	}
	my $rs = $self->{schema}->resultset('?????Stat')->search(
		$where_clause,
		{
			order_by => { -asc => 'stat_date' }
		}
	);

	# Check if there are points
	if ($rs->count() <= 0) {
		$response->{error} = "No data found for stat";
		goto out;
	}

	# Check if too many points
	if ($rs->count() > LIMIT_OF_RECORDS) {
		$response->{error} = "Too many data entries: " . $rs->count() .
				     " (limit " . LIMIT_OF_RECORDS . ")";
		goto out;
	}


	##
	## Parse and store the dates
	##
	
	# Push in all the rows
	my $%%%%%%%s_**** = [];
	my $%%%%%%%s_res = [];
	my $%%%%%%%s_nu = [];
	
	my $parser = $self->{schema}->storage->datetime_parser;
	foreach my $row ($rs->all) {
		# extract the current date
		push(@{$%%%%%%%s_****}, {
			year => $row->stat_date->year,
			month => $row->stat_date->month,
			day => $row->stat_date->day,
			number => 0.0 + $row->get_column('%%%%%%%s_****')
		});
		push(@{$%%%%%%%s_res}, {
			year => $row->stat_date->year,
			month => $row->stat_date->month,
			day => $row->stat_date->day,
			number => 0.0 + $row->get_column('%%%%%%%s_res')
		});
		push(@{$%%%%%%%s_nu}, {
			year => $row->stat_date->year,
			month => $row->stat_date->month,
			day => $row->stat_date->day,
			number => 0.0 + $row->get_column('%%%%%%%s_not_updated')
		});
	}

	##
	## Fill in the response
	##
	$response->{****} = $%%%%%%%s_****;
	$response->{########s} = $%%%%%%%s_res;
	$response->{un****} = $%%%%%%%s_nu;

out:
	return;
}


1;
